package com.jellyone.zadachnik.web.dto

import java.time.LocalDateTime

data class SprintModel(
    val length: Int,
    val startAt: LocalDateTime,
    val planningDateTime: LocalDateTime,
    val retroDateTime: LocalDateTime,
    val reviewDateTime: LocalDateTime,
    val tasksIds: List<Long>,
)
