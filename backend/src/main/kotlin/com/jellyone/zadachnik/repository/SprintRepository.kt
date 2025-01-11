package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Sprint
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface SprintRepository : JpaRepository<Sprint, Long> {
    fun findAllByTeamId(
        teamId: Long,
        pageable: Pageable
    ): Page<Sprint>

    @Query(
        """
        SELECT s FROM Sprint s
        WHERE s.team.id IN (
            SELECT t.id FROM Team t
            WHERE t.scrumMaster.id IN (
                SELECT p.owner.id FROM Product p
                WHERE p.id = :productId
            )
        )
        """
    )
    fun findAllByProductId(
        productId: Long,
        pageable: Pageable
    ): Page<Sprint>
}