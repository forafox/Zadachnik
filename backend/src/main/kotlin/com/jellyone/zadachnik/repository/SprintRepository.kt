package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Sprint
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SprintRepository : JpaRepository<Sprint, Long> {
    fun findAllByTeamId(
        teamId: Long,
        pageable: org.springframework.data.domain.Pageable
    ): org.springframework.data.domain.Page<Sprint>
}