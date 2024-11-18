package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.service.UserService
import com.jellyone.zadachnik.web.dto.GetMeResponse
import com.jellyone.zadachnik.web.response.UserResponse
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
    private val userService: UserService
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
        return GetMeResponse(principal.name, user.getFullName(), user.id, user.role)
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
        return GetMeResponse(user.username, user.getFullName(), user.id, user.role)
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
        @RequestParam(required = false, defaultValue = "10") size: Int
    ): Page<UserResponse> {
        val users = userService.getUsers(search, page, size)
        return users.map { user ->
            UserResponse(user.id, user.username, user.getFullName(), user.role)
        }
    }

}