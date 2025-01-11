package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.CommentService
import com.jellyone.zadachnik.service.TaskService
import com.jellyone.zadachnik.service.TeamService
import com.jellyone.zadachnik.web.request.CreateTeamRequest
import com.jellyone.zadachnik.web.request.UpdateTeamRequest
import com.jellyone.zadachnik.web.response.TeamResponse
import com.jellyone.zadachnik.web.response.toResponse
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import lombok.RequiredArgsConstructor
import org.springframework.data.domain.Page
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
class TeamController(
    private val teamService: TeamService,
    private val taskService: TaskService,
    private val commentService: CommentService
) {
    @PostMapping
    @Operation(
        summary = "Create Team",
        description = "Create a new team",
        operationId = "createTeam",
        responses = [
            io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "Team is created",
                content = [
                    io.swagger.v3.oas.annotations.media.Content(
                        mediaType = "application/json",
                        schema = io.swagger.v3.oas.annotations.media.Schema(implementation = TeamResponse::class)
                    )
                ]
            )
        ]
    )
    fun createTeam(
        @Valid @RequestBody request: CreateTeamRequest,
        principal: Principal
    ): TeamResponse {
        return teamService.createTeam(
            title = request.title,
            scrumMasterUsername = principal.name
        ).toResponse()
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Get team by id",
        description = "Get team by id",
        responses = [
            ApiResponse(
                responseCode = "200",
                description = "Team successfully retrieved",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = TeamResponse::class)
                    )
                ]
            ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    fun getTeamById(
        @PathVariable("id") id: Long
    ): TeamResponse {
        return teamService.getTeamById(id).toResponse()
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Update team by id",
        description = "Update team by id",
        responses = [
            ApiResponse(
                responseCode = "200",
                description = "Team updated",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = TeamResponse::class)
                    )
                ]
            ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    fun updateTeamById(
        @PathVariable("id") id: Long,
        @Valid @RequestBody request: UpdateTeamRequest,
    ): TeamResponse {
        return teamService.updateTeamById(
            id = id,
            title = request.title
        ).toResponse()
    }

    @GetMapping
    @Operation(
        summary = "Get teams with pagination",
        description = "Get paginated teams"
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Teams successfully retrieved",
                content = [Content(schema = Schema(implementation = Page::class), mediaType = "application/json")]
            ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    fun getTeams(
        @RequestParam(required = false, defaultValue = "0") page: Int,
        @RequestParam(required = false, defaultValue = "10") size: Int
    ): Page<TeamResponse> {
        val teams = teamService.getTeams(page, size)
        return teams.map { team ->
            TeamResponse(
                id = team.id,
                title = team.title,
                scrumMaster = team.scrumMaster.toResponse()
            )
        }
    }

    @GetMapping("/{teamId}/tasks")
    fun getTasksByTeamId(
        @PathVariable teamId: Long
    ) = taskService.getTasksByTeamId(teamId).map { task ->
        task.toResponse()
    }

    @GetMapping("/{teamId}/minutes")
    fun getMinutesByTeamId(
        @PathVariable teamId: Long,
        @RequestParam(required = false, defaultValue = "0") page: Int,
        @RequestParam(required = false, defaultValue = "10") size: Int
    ) = commentService.getCommentsByTeamId(teamId, page, size).map { comment ->
        comment.toResponse()
    }
}