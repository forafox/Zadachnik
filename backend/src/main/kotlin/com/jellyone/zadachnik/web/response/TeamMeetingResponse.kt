package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.TeamMeeting
import com.jellyone.zadachnik.domain.enums.TeamMeetingType

data class TeamMeetingResponse(
    val id: Long,
    val type: TeamMeetingType,
    val agenda: String,
    val team: TeamResponse
)

fun TeamMeeting.toResponse() = TeamMeetingResponse(
    id = id,
    type = type,
    agenda = agenda,
    team = team.toResponse()
)