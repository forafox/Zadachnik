package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.enums.Role

data class UserResponse(
    val id: Long,
    val username: String,
    val fullName: String,
    val role: Role
)