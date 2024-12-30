package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.domain.enums.TeamMeetingType
import com.jellyone.zadachnik.web.request.CreateSprintRequest
import com.jellyone.zadachnik.web.request.CreateTeamRequest
import com.jellyone.zadachnik.web.request.UpdateMeetingRequest
import com.jellyone.zadachnik.web.request.UpdateSprintRequest
import com.jellyone.zadachnik.web.response.SprintResponse
import com.jellyone.zadachnik.web.response.TeamResponse
import io.restassured.RestAssured
import io.restassured.http.ContentType
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.MethodOrderer
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
class SprintControllerTest {

    @LocalServerPort
    private var port: Int = 0

    companion object {
        private var jwtToken: String? = null
        private var teamId: Long = 0

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
    fun createSprintShouldReturnOk() {
        teamId = createTeam()
        val request = CreateSprintRequest(
            startsAt = LocalDateTime.now(),
            length = 14,
            tasksIds = listOf(1L, 2L),
            planningDateTime = LocalDateTime.now().plusDays(1),
            retroDateTime = LocalDateTime.now().plusDays(15),
            reviewDateTime = LocalDateTime.now().plusDays(16)
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/teams/$teamId/sprints")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(SprintResponse::class.java)

        assertEquals(14, response.length)
    }

    @Order(2)
    @Test
    fun getSprintByIdShouldReturnOk() {
        val sprintId = 1L
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/teams/$teamId/sprints/$sprintId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(SprintResponse::class.java)

        assertEquals(sprintId, response.id)
    }

    @Order(3)
    @Test
    fun updateSprintShouldReturnOk() {
        val sprintId = 1L
        val request = UpdateSprintRequest(
            length = 21,
            startsAt = LocalDateTime.now().plusDays(2),
            tasksIds = listOf(3L, 4L)
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .put("/api/teams/$teamId/sprints/$sprintId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(SprintResponse::class.java)

        assertEquals(21, response.length)
    }

    @Order(4)
    @Test
    fun updateSprintMeetingShouldReturnOk() {
        val sprintId = 1L
        val request = UpdateMeetingRequest(
            type = TeamMeetingType.PLANNING,
            agenda = "Discuss sprint goals",
            date = LocalDateTime.now().plusDays(1)
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .put("/api/teams/$teamId/sprints/$sprintId/meeting")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        assertEquals("Discuss sprint goals", response.getString("agenda"))
    }

    @Order(5)
    @Test
    fun getSprintTasksShouldReturnOk() {
        val sprintId = 1L
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("pageNumber", 0)
            .queryParam("pageSize", 10)
            .`when`()
            .get("/api/teams/$teamId/sprints/$sprintId/tasks")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")
        assert(content.isEmpty()) { "Task list should be empty" }
    }

    private fun createTeam(): Long {
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
        return response.id
    }

    private fun registerTestUser() {
        val signUpRequest = mapOf(
            "username" to "testuser",
            "fullName" to "Test User",
            "password" to "password"
        )
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
        val loginRequest = mapOf(
            "username" to "testuser",
            "password" to "password"
        )
        val response = RestAssured.given()
            .contentType(ContentType.JSON)
            .body(loginRequest)
            .accept(ContentType.JSON)
            .`when`()
            .post("/api/auth/login")
            .then()
            .statusCode(HttpStatus.OK.value())
            .extract()
            .`as`(Map::class.java)

        jwtToken = response["accessToken"] as String
    }
}
