package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Team
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface TeamRepository : JpaRepository<Team, Long>, JpaSpecificationExecutor<Team> {

}