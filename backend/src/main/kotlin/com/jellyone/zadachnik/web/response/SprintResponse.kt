package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.Sprint
import java.time.LocalDateTime

data class SprintResponse(
    val id: Long,
    val length: Int,
    val startAt: LocalDateTime,
    val planningDateTime: LocalDateTime,
    val retroDateTime: LocalDateTime,
    val reviewDateTime: LocalDateTime,
)

fun Sprint.toResponse() = SprintResponse(
    id = id,
    length = length,
    startAt = startAt,
    planningDateTime = planningMeeting.date,
    retroDateTime = retroMeeting.date,
    reviewDateTime = reviewMeeting.date,
)