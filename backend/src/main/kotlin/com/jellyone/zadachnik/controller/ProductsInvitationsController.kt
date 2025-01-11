package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.domain.ProductTeamStatus
import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.ProductsInvitationsService
import com.jellyone.zadachnik.web.request.UpdateProductInvitationRequest
import com.jellyone.zadachnik.web.response.toResponse
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import lombok.RequiredArgsConstructor
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@SecurityRequirement(name = "JWT")
@RestController
@RequestMapping("/api/teams/{teamId}/product-invitations")
@RequiredArgsConstructor
@Validated
@Tag(name = "Products Invitations API")
@ApiResponses(
    ApiResponse(
        responseCode = "400",
        description = "Invalid input",
        content = [Content(schema = Schema(implementation = ErrorMessage::class), mediaType = "application/json")]
    )
)
class ProductsInvitationsController(
    private val productsInvitationsService: ProductsInvitationsService
) {
    @PostMapping("/{productId}")
    fun createProductInvitation(
        @PathVariable("teamId") teamId: Long,
        @PathVariable("productId") productId: Long,
    ) = productsInvitationsService.createProductInvitation(
        teamId = teamId,
        productId = productId
    ).toResponse()

    @PutMapping("/{productId}")
    fun updateProductInvitation(
        @PathVariable("teamId") teamId: Long,
        @PathVariable("productId") productId: Long,
        @RequestBody request: UpdateProductInvitationRequest
    ) = productsInvitationsService.updateProductInvitation(
        teamId = teamId,
        productId = productId,
        status = request.status
    ).toResponse()

    @GetMapping("/{productId}")
    fun getProductInvitation(
        @PathVariable("teamId") teamId: Long,
        @PathVariable("productId") productId: Long,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ) = productsInvitationsService.getProductInvitation(
        teamId = teamId,
        productId = productId,
        page = page,
        size = size
    ).map { productTeamRelation ->
        productTeamRelation.toResponse()
    }

    @Operation(
        summary = "Возвращает все приглашения для данной команды",
    )
    @GetMapping
    fun getAllTeamProductInvitations(
        @PathVariable("teamId") teamId: Long,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
        @RequestParam(required = false) status: ProductTeamStatus?
    ) = productsInvitationsService.getAllTeamProductInvitationsByTeamId(
        teamId = teamId,
        page = page,
        size = size,
        status = status
    ).map { productTeamRelation ->
        productTeamRelation.toResponse()
    }
}