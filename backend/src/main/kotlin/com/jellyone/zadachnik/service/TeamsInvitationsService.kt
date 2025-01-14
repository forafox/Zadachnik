package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Team
import com.jellyone.zadachnik.domain.User
import com.jellyone.zadachnik.domain.UserTeamRelation
import com.jellyone.zadachnik.domain.UserTeamStatus
import com.jellyone.zadachnik.repository.UserTeamRelationRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class TeamsInvitationsService(
    private val userTeamRelationRepository: UserTeamRelationRepository,
    private val userService: UserService,
    private val teamService: TeamService,
) {
    fun createTeamInvitation(
        teamId: Long,
        userId: Long
    ): UserTeamRelation {

        val userTeamRelation = userTeamRelationRepository.findAllByStatus(UserTeamStatus.PENDING)
        if (userTeamRelation.isNotEmpty()) {
            throw IllegalStateException("There are still unanswered requests")
        }
        return userTeamRelationRepository.save(
            UserTeamRelation(
                id = 0,
                user = userService.getById(userId),
                team = teamService.getTeamById(teamId),
                status = UserTeamStatus.PENDING
            )
        )
    }

    fun updateTeamInvitation(
        teamId: Long,
        userId: Long,
        status: UserTeamStatus
    ): UserTeamRelation {
        val userTeamRelation = userTeamRelationRepository.findAllByTeamIdAndStatus(teamId, UserTeamStatus.PENDING)
        if (userTeamRelation.size != 1) {
            throw IllegalStateException("There should be only one product invitation")
        }

        return userTeamRelationRepository.save(
            userTeamRelation.first().copy(
                status = status
            )
        )

    }

    fun getTeamInvitation(teamId: Long, size: Int, page: Int, status: UserTeamStatus?): Page<UserTeamRelation> {
        return if (status != null) {
            userTeamRelationRepository.findAllByTeamIdAndStatus(teamId, status, PageRequest.of(page, size))
        } else {
            userTeamRelationRepository.findAllByTeamId(teamId, PageRequest.of(page, size))
        }
    }

    fun getUsersOfTeams(teamId: Long, page: Int, size: Int) =
        userTeamRelationRepository.findAllUsersOfTeams(
            teamId,
            PageRequest.of(page, size)
        )

    fun getAllTeamInvitationByUsername(
        page: Int,
        size: Int,
        status: UserTeamStatus?,
        username: String
    ): Page<UserTeamRelation> {
        val userId = userService.getByUsername(username).id
        return if (status != null) {
            userTeamRelationRepository.findAllByUserIdAndStatus(userId, status, PageRequest.of(page, size))
        } else {
            userTeamRelationRepository.findAllByUserId(userId, PageRequest.of(page, size))
        }
    }

    fun getTeamsOfCurrentUser(page: Int, size: Int, username: String): Page<Team> {
        val user = userService.getByUsername(username)
        return userTeamRelationRepository.findAllTeamsOfUser(PageRequest.of(page, size), user.id)
    }

    fun getTeamsOfUserScrumMaster(page: Int, size: Int, username: String): Page<Team> {
        val user = userService.getByUsername(username)
        return userTeamRelationRepository.findAllTeamsOfUser(PageRequest.of(page, size), user.id)
    }
}