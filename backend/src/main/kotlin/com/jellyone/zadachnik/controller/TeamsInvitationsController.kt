package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.domain.UserTeamStatus
import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.TeamsInvitationsService
import com.jellyone.zadachnik.web.request.UpdateTeamInvitationRequest
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
@RequestMapping("/api/teams/{teamId}/developer-invitations")
@RequiredArgsConstructor
@Validated
@Tag(name = "Teams Invitations API")
@ApiResponses(
    ApiResponse(
        responseCode = "400",
        description = "Invalid input",
        content = [Content(schema = Schema(implementation = ErrorMessage::class), mediaType = "application/json")]
    )
)
class TeamsInvitationsController(
    private val teamsInvitationsService: TeamsInvitationsService
) {
    @PostMapping("/{userId}")
    fun createTeamInvitation(
        @PathVariable("teamId") teamId: Long,
        @PathVariable("userId") userId: Long
    ) = teamsInvitationsService.createTeamInvitation(
        teamId = teamId,
        userId = userId
    ).toResponse()

    @PutMapping("/{userId}")
    fun updateTeamInvitation(
        @PathVariable("teamId") teamId: Long,
        @PathVariable("userId") userId: Long,
        @RequestBody request: UpdateTeamInvitationRequest
    ) = teamsInvitationsService.updateTeamInvitation(
        teamId = teamId,
        userId = userId,
        status = request.status
    ).toResponse()

    @Operation(
        summary = "Возвращает все приглашения от данной команды",
    )
    @GetMapping("")
    fun getAllTeamInvitationByTeamId(
        @PathVariable("teamId") teamId: Long,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
        @RequestParam(required = false) status: UserTeamStatus?
    ) = teamsInvitationsService.getTeamInvitation(
        teamId = teamId,
        page = page,
        size = size,
        status = status
    ).map { teamTeamRelation ->
        teamTeamRelation.toResponse()
    }
}