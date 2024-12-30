package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.TeamMeetingService
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
    private val teamMeetingService: TeamMeetingService
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
}