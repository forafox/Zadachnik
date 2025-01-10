package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.Task
import com.jellyone.zadachnik.domain.enums.TaskType

data class TaskResponse(
    val id: Long,
    val type: TaskType,
    val title: String,
    val description: String?,
    val assignee: UserResponse?,
    val status: String,
    val product: ProductResponse,
)

fun Task.toResponse() = TaskResponse(
    id = id,
    type = type,
    title = title,
    assignee = assignee?.toResponse(),
    status = status.name,
    description = description,
    product = product.toResponse(),
)
