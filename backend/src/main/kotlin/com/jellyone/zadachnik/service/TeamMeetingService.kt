package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Article
import com.jellyone.zadachnik.domain.TeamMeeting
import com.jellyone.zadachnik.domain.enums.TeamMeetingType
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.ArticleRepository
import com.jellyone.zadachnik.repository.TeamMeetingRepository
import com.jellyone.zadachnik.web.response.ArticleInTeamMeetingResponse
import com.jellyone.zadachnik.web.response.ArticleResponse
import com.jellyone.zadachnik.web.response.TeamMeetingWithArticles
import com.jellyone.zadachnik.web.response.toResponse
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class TeamMeetingService(
    private val teamMeetingRepository: TeamMeetingRepository,
    private val userService: UserService,
    private val teamService: TeamService,
    private val articleRepository: ArticleRepository,
) {
    fun createTeamMeeting(
        type: TeamMeetingType,
        agenda: String,
        teamId: Long,
        date: LocalDateTime,
    ): TeamMeeting {
        return teamMeetingRepository.save(
            TeamMeeting(
                id = 0,
                agenda = agenda,
                type = type,
                date = date,
                team = teamService.getTeamById(teamId)
            )
        )
    }

    fun getTeamMeetingsWithArticles(teamId: Long, page: Int, size: Int): List<TeamMeetingWithArticles> {
        val teamMeetingsPage = teamMeetingRepository.findAllByTeamId(teamId, PageRequest.of(page, size))

        val teamMeetingIds = teamMeetingsPage.content.map { it.id }

        val articlesByMeeting = articleRepository.findAllByTeamMeetingIdIn(teamMeetingIds)
            .groupBy { it.teamMeeting?.id }

        return teamMeetingsPage.content.map { teamMeeting ->
            TeamMeetingWithArticles(
                id = teamMeeting.id,
                type = teamMeeting.type,
                agenda = teamMeeting.agenda,
                team = teamMeeting.team.toResponse(),
                date = teamMeeting.date,
                articles = articlesByMeeting[teamMeeting.id]?.map { article ->
                    ArticleInTeamMeetingResponse(
                        id = article.id,
                        content = article.content,
                        author = article.author.toResponse()
                    )
                } ?: emptyList()
            )
        }
    }

    fun updateTeamMeetingById(
        id: Long,
        date: LocalDateTime,
        agenda: String
    ): TeamMeeting {
        val teamMeeting = teamMeetingRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Team meeting with id $id not found") }

        return teamMeetingRepository.save(teamMeeting.copy(date = date, agenda = agenda))
    }

    fun createArticle(
        meetingId: Long,
        teamId: Long,
        content: String,
        authorUsername: String
    ): Article {
        val teamMeeting = teamMeetingRepository.findById(meetingId)
            .orElseThrow { ResourceNotFoundException("Team meeting with id $meetingId not found") }

        return articleRepository.save(
            Article(
                id = 0,
                content = content,
                author = userService.getByUsername(authorUsername),
                teamMeeting = teamMeeting
            )
        )
    }
}