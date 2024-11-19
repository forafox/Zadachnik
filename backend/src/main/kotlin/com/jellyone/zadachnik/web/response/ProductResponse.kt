package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.Product

class ProductResponse(
    val id: Long,
    val shortName: String,
    val title: String?,
    val description: String?,
    val owner: UserResponse,
)

fun Product.toResponse() = ProductResponse(
    id = id,
    shortName = shortName,
    title = title,
    description = description,
    owner = owner.toResponse()
)