package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.TeamMeeting
import com.jellyone.zadachnik.domain.enums.TeamMeetingType
import com.jellyone.zadachnik.repository.TeamMeetingRepository
import org.springframework.stereotype.Service

@Service
class TeamMeetingService(
    private val teamMeetingRepository: TeamMeetingRepository,
    private val userService: UserService,
    private val teamService: TeamService,
) {
    fun createTeamMeeting(
        type: TeamMeetingType,
        agenda: String,
        teamId: Long
    ): TeamMeeting {
        return teamMeetingRepository.save(
            TeamMeeting(
                id = 0,
                agenda = agenda,
                type = type,
                team = teamService.getTeamById(teamId)
            )
        )
    }
}