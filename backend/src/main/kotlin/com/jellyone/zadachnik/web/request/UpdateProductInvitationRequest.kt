package com.jellyone.zadachnik.web.request

import com.jellyone.zadachnik.domain.ProductTeamStatus

data class UpdateProductInvitationRequest (
    val status: ProductTeamStatus
)