package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.domain.UserTeamStatus
import com.jellyone.zadachnik.service.*
import com.jellyone.zadachnik.web.dto.GetMeResponse
import com.jellyone.zadachnik.web.response.ProductResponse
import com.jellyone.zadachnik.web.response.TeamResponse
import com.jellyone.zadachnik.web.response.UserResponse
import com.jellyone.zadachnik.web.response.toResponse
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.data.domain.Page
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/api")
@Tag(name = "User Management")
@SecurityRequirement(name = "JWT")
class UserController(
    private val userService: UserService,
    private val teamsInvitationsService: TeamsInvitationsService,
    private val productInvitationsService: ProductsInvitationsService
) {

    @GetMapping("/me")
    @Operation(summary = "Get current user", description = "Get current user")
    @ApiResponses(
        value = [ApiResponse(
            responseCode = "200",
            description = "Current user successfully retrieved",
            content = [
                Content(
                    schema = Schema(implementation = GetMeResponse::class)
                )
            ]
        ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    fun me(principal: Principal): GetMeResponse {
        val user = userService.getByUsername(principal.name)
        return GetMeResponse(principal.name, user.fullName, user.id, user.role)
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Get user by id", description = "Get user by id")
    @ApiResponses(
        value = [ApiResponse(
            responseCode = "200",
            description = "User successfully retrieved",
            content = [Content(schema = Schema(implementation = GetMeResponse::class), mediaType = "application/json")]
        ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    fun getUserById(@PathVariable id: Long): GetMeResponse {
        val user = userService.getById(id)
        return GetMeResponse(user.username, user.fullName, user.id, user.role)
    }

    @GetMapping("/users")
    @Operation(
        summary = "Get users with pagination and search",
        description = "Get paginated users with optional fuzzy search by fullName or username"
    )
    @ApiResponses(
        value = [
            ApiResponse(
                responseCode = "200",
                description = "Users successfully retrieved",
                content = [Content(schema = Schema(implementation = Page::class), mediaType = "application/json")]
            ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    fun getUsers(
        @RequestParam(required = false, defaultValue = "") search: String,
        @RequestParam(required = false, defaultValue = "0") page: Int,
        @RequestParam(required = false, defaultValue = "10") size: Int,
        @RequestParam(required = false) productId: Long?,
        @RequestParam(required = false) teamId: Long?
    ): Page<UserResponse> {
        val users = userService.getUsers(search, productId, teamId, page, size)
        return users.map { user ->
            UserResponse(user.id, user.username, user.fullName, user.role)
        }
    }

    @GetMapping("/me/products")
    @Operation(summary = "Get products of current user", description = "Get products of current user")
    @ApiResponses(
        value = [ApiResponse(
            responseCode = "200",
            description = "Products successfully retrieved",
            content = [Content(schema = Schema(implementation = Page::class), mediaType = "application/json")]
        ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    fun getProductsOfCurrentUser(
        @RequestParam(required = false, defaultValue = "0") page: Int,
        @RequestParam(required = false, defaultValue = "10") size: Int,
        principal: Principal
    ): Page<ProductResponse> {
        val products = productInvitationsService.getProductsOfCurrentUser(page, size, principal.name)
        return products.map { product ->
            ProductResponse(
                id = product.id,
                ticker = product.ticker,
                title = product.title,
                description = product.description,
                owner = product.owner.toResponse()
            )
        }
    }

    @GetMapping("/me/teams")
    @Operation(summary = "Get teams of current user", description = "Get teams of current user")
    @ApiResponses(
        value = [ApiResponse(
            responseCode = "200",
            description = "Teams successfully retrieved",
            content = [Content(schema = Schema(implementation = Page::class), mediaType = "application/json")]
        ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    fun getTeamsOfCurrentUser(
        @RequestParam(required = false, defaultValue = "0") page: Int,
        @RequestParam(required = false, defaultValue = "10") size: Int,
        principal: Principal
    ): Page<TeamResponse> {
        val teams = teamsInvitationsService.getTeamsOfCurrentUser(page, size, principal.name)
        return teams.map { team ->
            TeamResponse(
                id = team.id,
                title = team.title,
                scrumMaster = team.scrumMaster.toResponse()
            )
        }
    }

    @GetMapping("/teams/{teamId}/users")
    fun getUsersOfTeams(
        @PathVariable("teamId") teamId: Long,
        @RequestParam(required = false, defaultValue = "0") page: Int,
        @RequestParam(required = false, defaultValue = "10") size: Int,
        principal: Principal
    ) = teamsInvitationsService.getUsersOfTeams(teamId, page, size).map { team ->
        team.toResponse()
    }

    @GetMapping("/me/team-invitations")
    @Operation(
        summary = "Возвращает все приглашения данного разработчика в команды"
    )
    fun getAllTeamInvitationsForUser(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
        @RequestParam(required = false) status: UserTeamStatus?,
        principal: Principal
    ) = teamsInvitationsService.getAllTeamInvitationByUsername(
        page = page,
        size = size,
        status = status,
        username = principal.name
    )
}