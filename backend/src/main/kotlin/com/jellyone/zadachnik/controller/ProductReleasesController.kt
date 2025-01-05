package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.ProductReleaseService
import com.jellyone.zadachnik.web.request.CreateProductReleaseRequest
import com.jellyone.zadachnik.web.response.toResponse
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import lombok.RequiredArgsConstructor
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import java.security.Principal


@SecurityRequirement(name = "JWT")
@RestController
@RequestMapping("/api/products/{productId}/releases")
@RequiredArgsConstructor
@Validated
@Tag(name = "Products Releases API")
@ApiResponses(
    ApiResponse(
        responseCode = "400",
        description = "Invalid input",
        content = [Content(schema = Schema(implementation = ErrorMessage::class), mediaType = "application/json")]
    )
)
class ProductReleasesController(
    private val productReleasesService: ProductReleaseService
) {
    @PostMapping
    fun createProductRelease(
        @PathVariable productId: Long,
        @RequestBody request: CreateProductReleaseRequest,
        principal: Principal
    ) = productReleasesService.createProductRelease(
        productId = productId,
        releaseNotes = request.releaseNotes,
        version = request.version,
        username = principal.name,
        sprintId = request.sprintId,
        tasksIds = request.tasks.map { task -> task.id }
    ).toResponse()

    @GetMapping
    fun getProductReleases(
        @PathVariable productId: Long,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ) = productReleasesService.getProductReleases(productId, page, size).map { release ->
        release.toResponse()
    }
}