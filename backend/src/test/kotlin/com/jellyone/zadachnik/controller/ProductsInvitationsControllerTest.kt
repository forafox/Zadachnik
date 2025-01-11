package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.controller.ProductControllerTest.Companion
import com.jellyone.zadachnik.domain.ProductTeamStatus
import com.jellyone.zadachnik.web.dto.SignUpRequest
import com.jellyone.zadachnik.web.dto.auth.JwtRequest
import com.jellyone.zadachnik.web.dto.auth.JwtResponse
import com.jellyone.zadachnik.web.request.CreateProductRequest
import com.jellyone.zadachnik.web.request.CreateTeamRequest
import com.jellyone.zadachnik.web.request.UpdateProductInvitationRequest
import com.jellyone.zadachnik.web.response.ProductResponse
import com.jellyone.zadachnik.web.response.ProductTeamRelationResponse
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
import kotlin.test.assertEquals

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation::class)
class ProductsInvitationsControllerTest {

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
    fun createProductInvitationShouldReturnOk() {
        createProduct()
        createTeam()

        val teamId = 1L
        val productId = 1L

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .post("/api/teams/$teamId/product-invitations/$productId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(ProductTeamRelationResponse::class.java)

        assertEquals(teamId, response.id)
    }

    @Order(2)
    @Test
    fun updateProductInvitationShouldReturnOk() {
        val teamId = 1L
        val productId = 1L
        val request =
            UpdateProductInvitationRequest(status = ProductTeamStatus.ACCEPTED)

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .contentType(ContentType.JSON)
            .body(request)
            .`when`()
            .put("/api/teams/$teamId/product-invitations/$productId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .`as`(ProductTeamRelationResponse::class.java)

        assertEquals("ACCEPTED", response.status.name)
    }

    @Order(3)
    @Test
    fun getProductInvitationShouldReturnOk() {
        val teamId = 1L
        val productId = 1L

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/teams/$teamId/product-invitations/$productId")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isNotEmpty()) { "Content should not be empty" }
        assert(content[0]["id"] != null) { "First invitation should have an ID" }
    }

    @Order(4)
    @Test
    fun getAllTeamProductInvitationsShouldReturnOk() {
        val teamId = 1L
        val productId = 1L
       val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/teams/$teamId/product-invitations")
            .then()
            .statusCode(HttpStatus.OK.value())
            .contentType(ContentType.JSON)
            .extract()
            .jsonPath()

        val content: List<Map<String, Any>> = response.getList("content")

        assert(content.isNotEmpty()) { "Content should not be empty" }
        assert(content[0]["id"] != null) { "First invitation should have an ID" }
    }

    @Order(5)
    @Test
    fun getProductInvitationNotFoundShouldReturnNotFound() {
        val teamId = 1L
        val productId = 9999

        RestAssured.given()
            .auth().oauth2(jwtToken)
            .`when`()
            .get("/api/teams/$teamId/product-invitations/$productId")
            .then()
            .statusCode(HttpStatus.OK.value())
    }

    @Order(6)
    @Test
    fun getProductTeamsShouldReturnOk() {
        val productId = 1L

        val response = RestAssured.given()
            .auth().oauth2(jwtToken)
            .queryParam("page", 0)
            .queryParam("size", 10)
            .`when`()
            .get("/api/products/$productId/teams")
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
    }

    private fun createProduct() {
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
    }
}
