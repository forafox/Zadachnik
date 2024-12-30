package com.jellyone.zadachnik.web.request

import java.time.LocalDateTime

data class CreateSprintRequest(
    val startsAt: LocalDateTime,
    val length: Int,
    val tasksIds: List<Long>,
    val planningDateTime: LocalDateTime,
    val retroDateTime: LocalDateTime,
    val reviewDateTime: LocalDateTime,
)