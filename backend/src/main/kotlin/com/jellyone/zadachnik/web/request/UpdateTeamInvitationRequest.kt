package com.jellyone.zadachnik.web.request

import com.jellyone.zadachnik.domain.UserTeamStatus

data class UpdateTeamInvitationRequest(
    val status: UserTeamStatus
)