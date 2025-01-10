package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.ArticleService
import com.jellyone.zadachnik.service.CommentService
import com.jellyone.zadachnik.web.request.CreateCommentRequest
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
import java.security.Principal

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
    private val articleService: ArticleService,
    private val commentService: CommentService
) {

    @PutMapping("/{id}")
    fun updateArticle(
        @PathVariable id: Long,
        @RequestBody request: UpdateArticleRequest
    ) = articleService.updateArticleById(
        id = id,
        content = request.content
    ).toResponse()

    @GetMapping("/{id}")
    fun getArticle(
        @PathVariable id: Long
    ) = articleService.getArticleById(id).toResponse()

    @GetMapping("/{articleId}/comments")
    fun getArticleComments(
        @PathVariable articleId: Long,
        @RequestParam(required = false) page: Int,
        @RequestParam(required = false) size: Int
    ) = commentService.getCommentsByArticleId(articleId, page, size)

    @PostMapping("/{articleId}/comments")
    fun createArticleComment(
        @PathVariable articleId: Long,
        @RequestBody request: CreateCommentRequest,
        principal: Principal
    ) = commentService.createComment(
        authorUsername = principal.name,
        content = request.content,
        articleId = articleId,
        taskId = null,
    ).toResponse()

}
