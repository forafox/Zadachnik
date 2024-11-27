package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.Task

data class TaskResponse(
    val id: Long,
    val type: String,
    val title: String,
    val description: String?,
)

fun Task.toResponse() = TaskResponse(
    id = id,
    type = type,
    title = title,
    description = description
)