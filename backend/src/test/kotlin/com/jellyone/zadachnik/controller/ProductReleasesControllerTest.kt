package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.web.dto.SignUpRequest
import com.jellyone.zadachnik.web.dto.auth.JwtRequest
import com.jellyone.zadachnik.web.dto.auth.JwtResponse
import com.jellyone.zadachnik.web.request.*
import com.jellyone.zadachnik.web.response.ProductReleaseResponse
import com.jellyone.zadachnik.web.response.SprintResponse
import com.jellyone.zadachnik.web.response.TaskResponse
import com.jellyone.zadachnik.web.response.TeamResponse
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
import java.time.LocalDateTime
import kotlin.test.assertEquals

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation::class)
class ProductReleasesControllerTest {

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
            createProduct()
            createTask()
            createSprint()
        }
    }

    @Order(1)
    @Test
    fun createProductReleaseShouldReturnOk() {
        val productId = 1L
        val request = CreateProductReleaseRequest(
            version = "1.0.0",
            releaseNotes = "Initial release",
            sprintId = 1L,
            tasks = listOf(TaskToReleaseRequest(id = 1L))
        )

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/products/$productId/releases")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(ProductReleaseResponse::class.java)

        assertEquals(request.version, response.version)
        assertEquals(request.releaseNotes, response.releaseNotes.content)
    }

    @Order(2)
    @Test
    fun getProductReleasesShouldReturnOk() {
        val productId = 1L
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/products/$productId/releases")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isNotEmpty()) { "Content should not be empty" }
        assert(content[0]["id"] != null) { "First release should have an ID" }
    }

    @Order(3)
    @Test
    fun createProductReleaseWithInvalidDataShouldReturnBadRequest() {
        val productId = 999L
        val request = CreateProductReleaseRequest(
            version = "",
            releaseNotes = "",
            sprintId = 1L,
            tasks = listOf()
        )

        RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/products/$productId/releases")
            .then()
            .statusCode(HttpStatus.NOT_FOUND.value())
            .contentType(ContentType.JSON)
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

    private fun createProduct() {
        val request = CreateProductRequest(
            ticker = "PROD001",
            title = "Test Product",
            description = "This is a test product."
        )
        RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/products")
            .then()
            .statusCode(HttpStatus.OK.value())
    }

    fun createTask() {
        val productId = 1L

        val request = CreateTaskRequest(
            type = "TASK",
            title = "Test title",
            description = "Test description",
            status = "TO_DO",
            assigneeId = null
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/products/${productId}/tasks")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(TaskResponse::class.java)
    }

    fun createSprint() {
        createTeam()
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
            .post("/api/teams/1/sprints")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(SprintResponse::class.java)
    }

    fun createTeam() {
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

        Assertions.assertEquals("Test Team", response.title)
    }
}
