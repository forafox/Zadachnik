package com.jellyone.zadachnik.web.request

class CreateProductRequest(
    val ticker: String,
    val title: String,
    val description: String?,
)