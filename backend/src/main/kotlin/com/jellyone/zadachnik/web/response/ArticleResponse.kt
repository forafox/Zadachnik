package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.Article

data class ArticleResponse(
    val id: Long,
    val content: String,
    val author: UserResponse,
    val teamMeeting: TeamMeetingResponse?
)

fun Article.toResponse() = ArticleResponse(
    id = id,
    content = content,
    author = author.toResponse(),
    teamMeeting = teamMeeting?.toResponse()
)