package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Team
import com.jellyone.zadachnik.domain.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface TeamRepository : JpaRepository<Team, Long>, JpaSpecificationExecutor<Team> {

    fun findAllByScrumMaster(
        pageable: PageRequest,
        user: User,
    ): Page<Team>
}