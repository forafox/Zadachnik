package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.Product

class ProductResponse(
    val id: Long,
    val ticker: String,
    val title: String,
    val description: String?,
    val owner: UserResponse,
)

data class UpdateProductRequest(
    val ticker: String,
    val title: String,
    val description: String?,
)

fun Product.toResponse() = ProductResponse(
    id = id,
    ticker = ticker,
    title = title,
    description = description,
    owner = owner.toResponse()
)