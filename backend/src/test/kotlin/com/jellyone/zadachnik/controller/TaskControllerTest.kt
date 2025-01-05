package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.controller.ProductControllerTest.Companion
import com.jellyone.zadachnik.web.request.CreateCommentRequest
import com.jellyone.zadachnik.web.request.CreateProductRequest
import com.jellyone.zadachnik.web.request.CreateTaskRequest
import com.jellyone.zadachnik.web.response.CommentResponse
import com.jellyone.zadachnik.web.response.ProductResponse
import com.jellyone.zadachnik.web.response.TaskResponse
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
class TaskControllerTest {

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
    fun createTaskShouldReturnOk() {
        val productId = createProductWithId1()

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

        assertEquals("TASK", response.type.name)
        assertEquals("Test title", response.title)
        assertEquals("Test description", response.description)
        assertEquals("TO_DO", response.status)
    }

    @Order(2)
    @Test
    fun getTaskByIdShouldReturnOk() {
        val taskId = 1L
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/products/1/tasks/$taskId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(TaskResponse::class.java)

        assertEquals(taskId, response.id)
        assertEquals("Test title", response.title)
    }

    @Order(3)
    @Test
    fun getTaskByIdNotFoundShouldReturnNotFound() {
        val taskId = 9999L
        RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/products/1/tasks/$taskId")
            .then()
            .statusCode(HttpStatus.NOT_FOUND.value())
    }

    @Order(4)
    @Test
    fun updateTaskByIdShouldReturnOk() {
        val taskId = 1L
        val request = CreateTaskRequest(
            type = "EPIC",
            title = "Updated Task",
            description = "Updated Description",
            status = "DONE",
            assigneeId = 1L
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .put("/api/products/1/tasks/$taskId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(TaskResponse::class.java)

        assertEquals(taskId, response.id)
        assertEquals("EPIC", response.type.name)
        assertEquals("Updated Task", response.title)
        assertEquals("Updated Description", response.description)
        assertEquals("DONE", response.status)
    }

    @Order(5)
    @Test
    fun getTaskHistoryShouldReturnOk() {
        val taskId = 1L
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/products/1/tasks/$taskId/history")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isNotEmpty()) { "Content should not be empty" }
        assert(content[0]["field"] != null) { "First change should have a field type" }
    }


    @Order(6)
    @Test
    fun createCommentShouldReturnOk() {
        val productId = 1L
        val taskId = 1L

        val request = CreateCommentRequest(
            content = "Test comment"
        )

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/products/$productId/tasks/$taskId/comments")
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
        val productId = 1L
        val taskId = 1L

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/products/$productId/tasks/$taskId/comments")
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
    fun getTasksByTeamIdShouldReturnOk() {
        val teamId = 1L
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/teams/$teamId/tasks")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isEmpty()) { "Content should not be empty" }
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

    private fun createProductWithId1(): Long {
        val request = CreateProductRequest(
            ticker = "PROD001",
            title = "Test Product",
            description = "This is a test product."
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .post("/api/products")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(ProductResponse::class.java)

        return response.id
    }
}
