package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.TeamMeeting
import com.jellyone.zadachnik.domain.enums.TeamMeetingType
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.TeamMeetingRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class TeamMeetingService(
    private val teamMeetingRepository: TeamMeetingRepository,
    private val userService: UserService,
    private val teamService: TeamService,
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

    fun updateTeamMeetingById(
        id: Long,
        date: LocalDateTime,
    ): TeamMeeting {
        val teamMeeting = teamMeetingRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Team meeting with id $id not found") }

        return teamMeetingRepository.save(teamMeeting.copy(date = date))
    }
}