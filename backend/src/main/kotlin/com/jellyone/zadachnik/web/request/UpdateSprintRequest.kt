package com.jellyone.zadachnik.web.request

import java.time.LocalDateTime

class UpdateSprintRequest (
    val length: Int,
    val startsAt: LocalDateTime,
    val tasksIds: List<Long>,
    val planningDateTime: LocalDateTime,
    val retroDateTime: LocalDateTime,
    val reviewDateTime: LocalDateTime,
)