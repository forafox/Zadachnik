package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.UserTeamRelation
import com.jellyone.zadachnik.domain.UserTeamStatus

data class UserTeamInvitationResponse(
    val id: Long,
    val status: UserTeamStatus,
)

fun UserTeamRelation.toResponse() = UserTeamInvitationResponse(
    id = id,
    status = status
)