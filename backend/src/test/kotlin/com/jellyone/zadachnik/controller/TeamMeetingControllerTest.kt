package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.controller.TaskControllerTest.Companion
import com.jellyone.zadachnik.domain.enums.TeamMeetingType
import com.jellyone.zadachnik.web.dto.SignUpRequest
import com.jellyone.zadachnik.web.dto.auth.JwtRequest
import com.jellyone.zadachnik.web.dto.auth.JwtResponse
import com.jellyone.zadachnik.web.request.*
import com.jellyone.zadachnik.web.response.ArticleResponse
import com.jellyone.zadachnik.web.response.CommentResponse
import com.jellyone.zadachnik.web.response.TeamMeetingResponse
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
import java.time.LocalDateTime

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation::class)
class TeamMeetingControllerTest {

    @LocalServerPort
    private var port: Int = 0

    companion object {
        private var jwtToken: String? = null

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
    fun createTeamMeetingShouldReturnOk() {
        createTeamShouldReturnOk()

        val createTeamMeetingRequest = CreateTeamMeetingRequest(
            type = TeamMeetingType.PLANNING,
            agenda = "Agenda for the team meeting",
            date = LocalDateTime.now()
        )
        val teamId = 1L

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(createTeamMeetingRequest)
            .`when`()
            .post("/api/teams/$teamId/meetings")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(TeamMeetingResponse::class.java)

        assertEquals(TeamMeetingType.PLANNING, response.type)
        assertEquals("Agenda for the team meeting", response.agenda)
    }

    @Order(2)
    @Test
    fun createArticleShouldReturnOk() {
        val teamId = 1L
        val meetingId = 1L
        val request = CreateArticleRequest(
            content = "Test content"
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/teams/$teamId/meetings/$meetingId/minutes")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(ArticleResponse::class.java)

        assertEquals("Test content", response.content)
    }

    @Order(3)
    @Test
    fun updateArticleByIdShouldReturnOk() {
        val articleId = 1L

        val request = UpdateArticleRequest(
            content = "Updated content"
        )

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .put("/api/articles/$articleId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(ArticleResponse::class.java)

        assertEquals(articleId, response.id)
        assertEquals("Updated content", response.content)
    }

    @Order(6)
    @Test
    fun createCommentShouldReturnOk() {
        val articleId = 1L
        val meetingId = 1L
        val teamId = 1L

        val request = CreateCommentRequest(
            content = "Test comment"
        )

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/teams/${teamId}/meetings/${meetingId}/minutes/${articleId}/comments")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(CommentResponse::class.java)

        assertEquals("Test comment", response.content)
    }

    @Order(7)
    @Test
    fun getCommentsByTaskIdShouldReturnOk() {
        val articleId = 1L
        val meetingId = 1L
        val teamId = 1L

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/teams/${teamId}/meetings/${meetingId}/minutes/${articleId}/comments")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val comments = response.getList("content", Map::class.java)
        assertEquals(1, comments.size)
    }

    @Order(8)
    @Test
    fun getArticleByIdShouldReturnOk() {
        val articleId = 1L
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/articles/$articleId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(ArticleResponse::class.java)

        assertEquals(articleId, response.id)
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

    private fun createTeamShouldReturnOk() {
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
    }
}
