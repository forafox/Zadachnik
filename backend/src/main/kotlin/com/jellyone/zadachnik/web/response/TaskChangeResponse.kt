package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.TaskChange
import java.time.LocalDateTime
import java.util.*

data class TaskChangeResponse(
    val field: FieldType,
    val previousValue: Any,
    val newValue: Any,
    val changedBy: UserResponse,
    val changedAt: LocalDateTime
)

enum class FieldType {
    ID, TYPE, TITLE, DESCRIPTION, PRODUCT
}

fun TaskChange.toResponse() = TaskChangeResponse(
    field = FieldType.valueOf(id.fieldName.uppercase(Locale.getDefault())),
    previousValue = previousValue,
    newValue = newValue,
    changedBy = changedBy.toResponse(),
    changedAt = changedAt
)