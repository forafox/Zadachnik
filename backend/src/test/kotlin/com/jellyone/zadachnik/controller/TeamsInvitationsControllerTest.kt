package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.controller.ProductsInvitationsControllerTest.Companion
import com.jellyone.zadachnik.domain.UserTeamStatus
import com.jellyone.zadachnik.web.dto.SignUpRequest
import com.jellyone.zadachnik.web.dto.auth.JwtRequest
import com.jellyone.zadachnik.web.dto.auth.JwtResponse
import com.jellyone.zadachnik.web.request.CreateTeamRequest
import com.jellyone.zadachnik.web.request.UpdateTeamInvitationRequest
import com.jellyone.zadachnik.web.response.TeamResponse
import com.jellyone.zadachnik.web.response.UserTeamInvitationResponse
import io.restassured.RestAssured
import io.restassured.http.ContentType
import org.junit.jupiter.api.*
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import kotlin.test.assertEquals

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation::class)
class TeamsInvitationsControllerTest {

    @LocalServerPort
    private var port: Int = 0

    companion object {
        private var jwtToken: String? = null
        private var teamId: Long = 0
        private var userId: Long = 0

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
            createTeam()
        }
    }

    @Order(1)
    @Test
    fun createTeamInvitationShouldReturnOk() {
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .post("/api/teams/$teamId/developer-invitations/$userId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(UserTeamInvitationResponse::class.java)

        assertEquals("PENDING", response.status.name)
    }

    @Order(2)
    @Test
    fun updateTeamInvitationShouldReturnOk() {
        val request = UpdateTeamInvitationRequest(status = UserTeamStatus.ACCEPTED)

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .put("/api/teams/$teamId/developer-invitations/$userId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(UserTeamInvitationResponse::class.java)

        assertEquals("ACCEPTED", response.status.name)
    }

    @Order(3)
    @Test
    fun getTeamInvitationShouldReturnOk() {
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/teams/$teamId/developer-invitations")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isNotEmpty()) { "Content should not be empty" }
        assert(content[0]["id"] != null) { "First invitation should have an ID" }
        assert(content[0]["status"] != null) { "First invitation should have a name" }
    }

    @Order(4)
    @Test
    fun getTeamInvitationNotFoundShouldReturnNotFound() {
        val teamId = 9999

        RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/teams/$teamId/developer-invitations")
            .then()
            .statusCode(HttpStatus.OK.value())
    }

    @Order(5)
    @Test
    fun getUsersOfTeamShouldReturnOk() {
        val teamId = 1L

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/teams/$teamId/users")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isNotEmpty()) { "Content should not be empty" }
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
        userId = response.id
    }

    private fun createTeam() {
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

        teamId = response.id
    }
}
