package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.TeamMeeting
import com.jellyone.zadachnik.domain.enums.TeamMeetingType

data class TeamMeetingResponse(
    val id: Long,
    val type: TeamMeetingType,
    val agenda: String,
    val team: TeamResponse,
    val users: Set<UserResponse>
)

fun TeamMeeting.toResponse() = TeamMeetingResponse(
    id = id,
    type = type,
    agenda = agenda,
    team = team.toResponse(),
    users = users.map { it.toResponse() }.toSet()
)