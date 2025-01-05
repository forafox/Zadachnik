package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.ProductTeamRelation
import com.jellyone.zadachnik.domain.ProductTeamStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductTeamRelationRepository : JpaRepository<ProductTeamRelation, Long> {
    fun findAllByTeamIdAndStatus(teamId: Long, status: ProductTeamStatus): List<ProductTeamRelation>
}
