package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.ProductTeamRelation
import com.jellyone.zadachnik.domain.ProductTeamStatus

data class ProductTeamRelationResponse(
    val id: Long,
    val product: ProductResponse,
    val team: TeamResponse,
    val status: ProductTeamStatus,
)

fun ProductTeamRelation.toResponse() = ProductTeamRelationResponse(
    id = id,
    product = product.toResponse(),
    team = team.toResponse(),
    status = status
)