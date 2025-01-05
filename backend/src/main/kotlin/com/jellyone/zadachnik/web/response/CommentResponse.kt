package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.Comment

data class CommentResponse(
    val id: Long,
    val content: String,
    val author: UserResponse,
)

fun Comment.toResponse() = CommentResponse(
    id = id,
    content = content,
    author = author.toResponse()
)