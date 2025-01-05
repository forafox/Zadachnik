package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.ProductTeamRelation
import com.jellyone.zadachnik.domain.ProductTeamStatus
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductTeamRelationRepository : JpaRepository<ProductTeamRelation, Long> {
    fun findAllByTeamIdAndStatus(teamId: Long, status: ProductTeamStatus): List<ProductTeamRelation>
    fun findAllByStatus(status: ProductTeamStatus): List<ProductTeamRelation>
    fun findAllByProductIdAndTeamId(
        productId: Long,
        teamId: Long,
        pageable: Pageable
    ): Page<ProductTeamRelation>
}
