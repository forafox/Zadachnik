package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Product
import com.jellyone.zadachnik.domain.ProductTeamRelation
import com.jellyone.zadachnik.domain.ProductTeamStatus
import com.jellyone.zadachnik.domain.Team
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
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

    @Query(
        """
            SELECT ptr.team
            FROM ProductTeamRelation ptr 
            WHERE ptr.product.id = :productId
              AND ptr.status = 'ACCEPTED'
        """
    )
    fun findAllTeamsByProductId(productId: Long, pageable: Pageable): Page<Team>

    fun findAllByTeamId(teamId: Long, pageable: Pageable): Page<ProductTeamRelation>

    fun findAllByTeamIdAndStatus(teamId: Long, status: ProductTeamStatus, pageable: Pageable): Page<ProductTeamRelation>

    fun findAllByProductId(productId: Long, pageable: Pageable): Page<ProductTeamRelation>

    fun findAllByProductIdAndStatus(
        productId: Long,
        status: ProductTeamStatus,
        pageable: Pageable
    ): Page<ProductTeamRelation>

    @Query(
        """
            SELECT DISTINCT p
            FROM Product p
            LEFT JOIN ProductTeamRelation ptr ON p.id = ptr.product.id
            WHERE (p.owner.id = :userId)
            OR (ptr.status = 'ACCEPTED' AND EXISTS (
               SELECT DISTINCT utr
               FROM UserTeamRelation utr
               WHERE utr.user.id = :userId
                 AND utr.team.id = ptr.team.id
                 AND utr.status = 'ACCEPTED'
           )
       )
    """
    )
    fun findAllProductsOfUser(pageable: Pageable, userId: Long): Page<Product>
}
