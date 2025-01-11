package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.UserTeamRelation
import com.jellyone.zadachnik.domain.UserTeamStatus

data class UserTeamInvitationResponse(
    val id: Long,
    val team: TeamResponse,
    val user: UserResponse,
    val status: UserTeamStatus,
)

fun UserTeamRelation.toResponse() = UserTeamInvitationResponse(
    id = id,
    user = user.toResponse(),
    team = team.toResponse(),
    status = status
)