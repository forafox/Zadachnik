package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.ProductService
import com.jellyone.zadachnik.web.dto.auth.JwtResponse
import com.jellyone.zadachnik.web.request.CreateProductRequest
import com.jellyone.zadachnik.web.response.ProductResponse
import com.jellyone.zadachnik.web.response.toResponse
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import lombok.RequiredArgsConstructor
import org.springframework.validation.annotation.Validated
import org.springframework.web.ErrorResponse
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Validated
@Tag(name = "Products API")
@ApiResponses(
    ApiResponse(
        responseCode = "200",
        description = "Successful operation",
        content = [Content(schema = Schema(implementation = JwtResponse::class), mediaType = "application/json")]
    ),
    ApiResponse(
        responseCode = "400",
        description = "Invalid input",
        content = [Content(schema = Schema(implementation = ErrorMessage::class), mediaType = "application/json")]
    )
)
class ProductController(
    private val productService: ProductService
) {
    @PostMapping
    @Operation(
        summary = "Create Product",
        description = "Create a new product",
        operationId = "createProduct"
    )
    fun createProduct(
        @Valid @RequestBody request: CreateProductRequest,
        principal: Principal
    ): ProductResponse {
        return productService.createProduct(
            shortName = request.shortName,
            description = request.description,
            title = request.title,
            ownerUsername = principal.name
        ).toResponse()
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Get product by id",
        description = "Get product by id",
        responses = [
            ApiResponse(
                responseCode = "200",
                description = "Product found",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = ProductResponse::class)
                    )
                ]
            ),
            ApiResponse(
                responseCode = "404",
                description = "Product not found",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = ErrorResponse::class)
                    )
                ]
            )
        ]
    )
    fun getProductById(@PathVariable id: Long): ProductResponse {
        return productService.getProductById(id).toResponse()
    }
}