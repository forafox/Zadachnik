package com.jellyone.zadachnik.web.request

data class CreateTaskRequest(
    val type: String,
    val title: String,
    val description: String?,
    val status: String,
)