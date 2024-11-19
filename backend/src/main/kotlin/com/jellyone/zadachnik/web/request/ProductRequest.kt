package com.jellyone.zadachnik.web.request

data class UpdateProductRequest(
    val ticker: String,
    val title: String,
    val description: String?,
)
