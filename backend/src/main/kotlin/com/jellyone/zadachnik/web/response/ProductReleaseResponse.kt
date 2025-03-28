package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.ProductRelease

data class ProductReleaseResponse(
    val id: Long,
    val version: String,
    val releaseNotes: ArticleResponse,
    val tasks: List<TaskResponse>,
    val product: ProductResponse,
    val sprint: SprintResponse,
)

fun ProductRelease.toResponse() = ProductReleaseResponse(
    id = id,
    version = version,
    releaseNotes = notes.toResponse(),
    tasks = tasks.map { it.toResponse() },
    product = product.toResponse(),
    sprint = sprint.toResponse()
)