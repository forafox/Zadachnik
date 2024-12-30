package com.jellyone.zadachnik.web.request

import com.jellyone.zadachnik.domain.enums.TeamMeetingType
import java.time.LocalDateTime

data class CreateTeamMeetingRequest(
    val type: TeamMeetingType,
    val agenda: String,
    val date: LocalDateTime,
)