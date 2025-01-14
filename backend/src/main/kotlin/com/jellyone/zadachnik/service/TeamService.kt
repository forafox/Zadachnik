package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Team
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.TeamRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class TeamService(
    private val teamRepository: TeamRepository,
    private val userService: UserService
) {
    fun createTeam(title: String, scrumMasterUsername: String): Team {
        return teamRepository.save(
            Team(
                id = 0,
                title = title,
                scrumMaster = userService.getByUsername(scrumMasterUsername)
            )
        )
    }

    fun getTeamById(id: Long): Team {
        return teamRepository.findById(id).orElseThrow { ResourceNotFoundException("Team with id $id not found") }
    }

    fun updateTeamById(id: Long, title: String): Team {
        val team = teamRepository.findById(id).orElseThrow { ResourceNotFoundException("Team with id $id not found") }
        return teamRepository.save(
            team.copy(
                title = title
            )
        )
    }

    fun getTeams(page: Int, size: Int): Page<Team> = teamRepository.findAll(PageRequest.of(page, size))

}