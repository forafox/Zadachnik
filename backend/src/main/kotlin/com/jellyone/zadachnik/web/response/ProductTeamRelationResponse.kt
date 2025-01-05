package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.ProductTeamRelation
import com.jellyone.zadachnik.domain.ProductTeamStatus

data class ProductTeamRelationResponse(
    val id: Long,
    val status: ProductTeamStatus,
)

fun ProductTeamRelation.toResponse() = ProductTeamRelationResponse(
    id = id,
    status = status
)