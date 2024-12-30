package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.Task

data class TaskResponse(
    val id: Long,
    val type: String,
    val title: String,
    val description: String?,
    val assignee: UserResponse,
    val status: String,
)

fun Task.toResponse() = TaskResponse(
    id = id,
    type = type,
    title = title,
    assignee = assignee.toResponse(),
    status = status.name,
    description = description
)