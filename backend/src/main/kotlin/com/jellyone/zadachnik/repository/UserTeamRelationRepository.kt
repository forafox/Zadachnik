package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Team
import com.jellyone.zadachnik.domain.User
import com.jellyone.zadachnik.domain.UserTeamRelation
import com.jellyone.zadachnik.domain.UserTeamStatus
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface UserTeamRelationRepository : JpaRepository<UserTeamRelation, Long> {
    fun findAllByTeamIdAndStatus(teamId: Long, status: UserTeamStatus): List<UserTeamRelation>
    fun findAllByStatus(status: UserTeamStatus): List<UserTeamRelation>
    fun findAllByTeamId(teamId: Long, pageable: Pageable): Page<UserTeamRelation>

    @Query(
        """
            SELECT utr.user 
            FROM UserTeamRelation utr 
            WHERE utr.team.id = :teamId 
              AND utr.status = 'ACCEPTED'
        """
    )
    fun findAllUsersOfTeams(
        @Param("teamId") teamId: Long,
        pageable: Pageable
    ): Page<User>

    fun findAllByTeamIdAndStatus(teamId: Long, status: UserTeamStatus, pageable: Pageable): Page<UserTeamRelation>

    fun findAllByUserIdAndStatus(userId: Long, status: UserTeamStatus, pageable: Pageable): Page<UserTeamRelation>

    fun findAllByUserId(userId: Long, pageable: Pageable): Page<UserTeamRelation>

    @Query(
        """
            SELECT utr.team 
            FROM UserTeamRelation utr 
            WHERE utr.user.id = :userId
              AND utr.status = 'ACCEPTED'
        """
    )
    fun findAllTeamsOfUser(
        pageable: Pageable,
        @Param("userId") userId: Long,
    ): Page<Team>
}