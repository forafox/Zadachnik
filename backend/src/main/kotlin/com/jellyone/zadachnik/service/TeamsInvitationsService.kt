package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.UserTeamRelation
import com.jellyone.zadachnik.domain.UserTeamStatus
import com.jellyone.zadachnik.repository.UserTeamRelationRepository
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

    fun getTeamInvitation(teamId: Long, size: Int, page: Int) =
        userTeamRelationRepository.findAllByTeamId(
            teamId = teamId,
            PageRequest.of(page, size)
        )
}