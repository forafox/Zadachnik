package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.enums.TeamMeetingType
import java.time.LocalDateTime

data class TeamMeetingWithArticles(
    val id: Long,
    val type: TeamMeetingType,
    val agenda: String,
    val team: TeamResponse,
    val date: LocalDateTime,
    val articles: List<ArticleInTeamMeetingResponse>
)

data class ArticleInTeamMeetingResponse(
    val id: Long,
    val content: String,
    val author: UserResponse,
)
