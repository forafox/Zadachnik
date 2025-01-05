package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.CommentService
import com.jellyone.zadachnik.service.TeamMeetingService
import com.jellyone.zadachnik.web.request.CreateArticleRequest
import com.jellyone.zadachnik.web.request.CreateCommentRequest
import com.jellyone.zadachnik.web.request.CreateTeamMeetingRequest
import com.jellyone.zadachnik.web.response.TeamMeetingResponse
import com.jellyone.zadachnik.web.response.TeamResponse
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
import java.security.Principal

@SecurityRequirement(name = "JWT")
@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
@Validated
@Tag(name = "Teams API")
@ApiResponses(
    ApiResponse(
        responseCode = "400",
        description = "Invalid input",
        content = [Content(schema = Schema(implementation = ErrorMessage::class), mediaType = "application/json")]
    )
)
class TeamMeetingController(
    private val teamMeetingService: TeamMeetingService,
    private val commentService: CommentService
) {
    @Operation(
        summary = "Create team meeting",
        description = "Create team meeting",
        responses = [
            io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "Team is created",
                content = [
                    io.swagger.v3.oas.annotations.media.Content(
                        mediaType = "application/json",
                        schema = io.swagger.v3.oas.annotations.media.Schema(implementation = TeamMeetingResponse::class)
                    )
                ]
            )
        ]
    )
    @PostMapping("{id}/meetings")
    fun createTeamMeeting(
        @PathVariable id: Long,
        @RequestBody teamMeeting: CreateTeamMeetingRequest
    ): TeamMeetingResponse {
        return teamMeetingService.createTeamMeeting(
            type = teamMeeting.type,
            agenda = teamMeeting.agenda,
            teamId = id,
            date = teamMeeting.date
        ).toResponse()
    }

    @PostMapping("{teamId}/meetings/{meetingId}/minutes")
    fun createArticle(
        @PathVariable meetingId: Long,
        @PathVariable teamId: Long,
        @RequestBody article: CreateArticleRequest,
        principal: Principal
    ) = teamMeetingService.createArticle(
        meetingId = meetingId,
        teamId = teamId,
        content = article.content,
        authorUsername = principal.name
    ).toResponse()

    @PostMapping("/{teamId}/meetings/{meetingId}/minutes/{articleId}/comments")
    fun createComment(
        @PathVariable meetingId: Long,
        @PathVariable teamId: Long,
        @PathVariable articleId: Long,
        @RequestBody request: CreateCommentRequest,
        principal: Principal
    ) = commentService.createComment(
        authorUsername = principal.name,
        content = request.content,
        articleId = articleId,
        taskId = null
    ).toResponse()

    @GetMapping("/{teamId}/meetings/{meetingId}/minutes/{articleId}/comments")
    fun getCommentsByArticleId(
        @PathVariable meetingId: Long,
        @PathVariable teamId: Long,
        @PathVariable articleId: Long,
        @RequestParam(required = false) page: Int,
        @RequestParam(required = false) size: Int
    ) = commentService.getCommentsByArticleId(articleId, page, size).map { comment ->
        comment.toResponse()
    }
}