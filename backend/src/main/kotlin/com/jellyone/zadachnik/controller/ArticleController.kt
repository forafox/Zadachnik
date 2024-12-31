package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.ArticleService
import com.jellyone.zadachnik.web.request.UpdateArticleRequest
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

@SecurityRequirement(name = "JWT")
@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@Validated
@Tag(name = "Articles API")
@ApiResponses(
    ApiResponse(
        responseCode = "400",
        description = "Invalid input",
        content = [Content(schema = Schema(implementation = ErrorMessage::class), mediaType = "application/json")]
    )
)
class ArticleController(
    private val articleService: ArticleService
) {

    @PutMapping("/{id}")
    fun updateArticle(
        @PathVariable id: Long,
        @RequestBody request: UpdateArticleRequest
    ) = articleService.updateArticleById(
        id = id,
        content = request.content
    ).toResponse()
}