package com.jellyone.zadachnik.web.request

import com.jellyone.zadachnik.domain.enums.TeamMeetingType

data class CreateTeamMeetingRequest(
    val type: TeamMeetingType,
    val agenda: String,
)