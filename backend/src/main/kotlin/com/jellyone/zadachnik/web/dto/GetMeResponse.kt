package com.jellyone.zadachnik.web.dto

import com.jellyone.zadachnik.domain.enums.Role
import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "DTO for read operations on the current user")
data class GetMeResponse(
    @Schema(description = "The username of the user", example = "j.doe")
    val username: String,

    @Schema(description = "The full name of the user", example = "John Doe")
    val fullName: String,

    @Schema(description = "The ID of the user", example = "1")
    val id: Long,

    @Schema(description = "The role of the user", example = "ADMIN")
    val role: Role,
) {
}