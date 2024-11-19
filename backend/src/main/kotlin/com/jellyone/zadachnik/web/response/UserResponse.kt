package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.User
import com.jellyone.zadachnik.domain.enums.Role

data class UserResponse(
    val id: Long,
    val username: String,
    val fullName: String,
    val role: Role
)

fun User.toResponse() = UserResponse(
    id = id,
    username = username,
    fullName = fullName,
    role = role
)