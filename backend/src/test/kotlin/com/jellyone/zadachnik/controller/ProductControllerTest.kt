package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.web.dto.SignUpRequest
import com.jellyone.zadachnik.web.dto.auth.JwtRequest
import com.jellyone.zadachnik.web.dto.auth.JwtResponse
import com.jellyone.zadachnik.web.request.CreateProductRequest
import com.jellyone.zadachnik.web.response.ProductResponse
import com.jellyone.zadachnik.web.request.UpdateProductRequest
import io.restassured.RestAssured
import io.restassured.http.ContentType
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
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
class ProductControllerTest {

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

    @Test
    fun createProductShouldReturnOk() {
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

        assertEquals("PROD001", response.ticker)
        assertEquals("Test Product", response.title)
        assertEquals("This is a test product.", response.description)
    }

    @Test
    fun createProductWithSameTickerShouldReturnConflict() {
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
            .statusCode(HttpStatus.CONFLICT.value())
    }

    @Test
    fun getProductByIdShouldReturnOk() {
        val productId = 1
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/products/$productId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(ProductResponse::class.java)

        assertEquals(1, response.id)
        assertEquals("PROD001", response.ticker)
        assertEquals("Test Product", response.title)
    }

    @Test
    fun getProductByIdNotFoundShouldReturnNotFound() {
        val productId = 9999
        RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/products/$productId")
            .then()
            .statusCode(HttpStatus.NOT_FOUND.value())
    }

    @Test
    fun updateProductByIdShouldReturnOk() {
        val productId = 1L
        val request = UpdateProductRequest(
            ticker = "PROD001_UPDATED",
            title = "Updated Product",
            description = "Updated description."
        )
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .put("/api/products/$productId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(ProductResponse::class.java)

        assertEquals(productId, response.id)
        assertEquals("PROD001_UPDATED", response.ticker)
        assertEquals("Updated Product", response.title)
        assertEquals("Updated description.", response.description)
    }

    @Test
    fun getProductsWithPaginationShouldReturnOk() {
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/products")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isNotEmpty()) { "Content should not be empty" }
        assert(content[0]["id"] != null) { "First product should have an ID" }
        assert(content[0]["ticker"] == "PROD001") { "Ticker of the first product should match the expected value" }
        assert(content[0]["title"] == "Test Product") { "Title of the first product should match the expected value" }

        val owner = content[0]["owner"] as Map<*, *>
        assert(owner["username"] == "testuser") { "Owner's username should match 'testuser'" }
    }

    @Test
    fun getTasksByProductIdShouldReturnOk() {
        val productId = 1L
        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/products/$productId/tasks")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isEmpty()) { "Task list should be empty" }
    }

    @Test
    fun getProductsOfCurrentUserShouldReturnOk() {
        RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/me/products")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()
            .let { response ->
                val content: List<Map<String, Any>> = response.getList("content")
                assert(content.isNotEmpty()) { "Content should not be empty" }
                assert(content[0]["id"] != null) { "First product should have an ID" }
            }
    }

    @Test
    fun getProductsWithoutAuthShouldReturnUnauthorized() {
        RestAssured.given()
            .`when`()
            .get("/api/products")
            .then()
            .statusCode(HttpStatus.UNAUTHORIZED.value())
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
