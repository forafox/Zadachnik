package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.web.dto.SignUpRequest
import com.jellyone.zadachnik.web.dto.auth.JwtRequest
import com.jellyone.zadachnik.web.dto.auth.JwtResponse
import com.jellyone.zadachnik.web.request.CreateTeamRequest
import com.jellyone.zadachnik.web.request.UpdateTeamRequest
import com.jellyone.zadachnik.web.response.TeamResponse
import io.restassured.RestAssured
import io.restassured.http.ContentType
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.MethodOrderer
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestMethodOrder
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation::class)
class TeamControllerTest {

    @LocalServerPort
    private var port: Int = 0

    companion object {
        var jwtToken: String? = null

        @Container
        private val postgres = PostgreSQLContainer<Nothing>("postgres:16-alpine")

        @DynamicPropertySource
        @JvmStatic
        fun configureProperties(registry: DynamicPropertyRegistry) {
            registry.add("spring.datasource.url", postgres::getJdbcUrl)
            registry.add("spring.datasource.username", postgres::getUsername)
            registry.add("spring.datasource.password", postgres::getPassword)
        }
    }

    @BeforeEach
    fun setUp() {
        RestAssured.baseURI = "http://localhost:$port"
        if (jwtToken == null) {
            registerTestUser()
            loginUser()
        }
    }

    @Order(1)
    @Test
    fun createTeamShouldReturnOk() {
        val request = CreateTeamRequest(
            title = "Test Team"
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/teams")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(TeamResponse::class.java)

        assertEquals("Test Team", response.title)
    }

    @Order(2)
    @Test
    fun getTeamByIdShouldReturnOk() {
        val teamId = 1L
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/teams/$teamId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(TeamResponse::class.java)

        assertEquals(teamId, response.id)
        assertEquals("Test Team", response.title)
    }

    @Order(3)
    @Test
    fun getTeamByIdNotFoundShouldReturnNotFound() {
        val teamId = 9999L
        RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/teams/$teamId")
            .then()
            .statusCode(HttpStatus.NOT_FOUND.value())
    }

    @Order(4)
    @Test
    fun updateTeamByIdShouldReturnOk() {
        val teamId = 1L
        val request = UpdateTeamRequest(
            title = "Updated Team"
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .put("/api/teams/1")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(TeamResponse::class.java)

        assertEquals(teamId, response.id)
        assertEquals("Updated Team", response.title)
    }

    @Order(5)
    @Test
    fun getTeamsWithPaginationShouldReturnOk() {
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/teams")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isNotEmpty()) { "Content should not be empty" }
        assert(content[0]["id"] != null) { "First team should have an ID" }
        assert(content[0]["title"] == "Updated Team") { "Title of the first team should match the expected value" }
    }

    @Order(6)
    @Test
    fun getTeamsOfCurrentUserShouldReturnOk() {
        RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/me/teams")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()
            .let { response ->
                val content: List<Map<String, Any>> = response.getList("content")
                assert(content.isNotEmpty()) { "Content not should be empty" }
            }
    }

    private fun registerTestUser() {
        val signUpRequest = SignUpRequest(username = "testuser", fullName = "Test User", password = "password")
        RestAssured.given()
            .contentType(ContentType.JSON)
            .body(signUpRequest)
            .accept(ContentType.JSON)
            .`when`()
            .post("/api/auth/register")
            .then()
            .statusCode(HttpStatus.OK.value())
    }

    private fun loginUser() {
        val loginRequest = JwtRequest(username = "testuser", password = "password")
        val response = RestAssured.given()
            .contentType(ContentType.JSON)
            .body(loginRequest)
            .accept(ContentType.JSON)
            .`when`()
            .post("/api/auth/login")
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .`as`(JwtResponse::class.java)

        jwtToken = response.accessToken
    }
}
