package com.jellyone.zadachnik.web.request

data class CreateProductReleaseRequest(
    val version: String,
    val releaseNotes: String,
    val sprintId: Long,
    val tasks: List<TaskToReleaseRequest>
)