package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.ProductRelease
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ProductReleaseRepository : JpaRepository<ProductRelease, Long> {
    @Query("SELECT pr FROM ProductRelease pr WHERE pr.product.id = :productId ORDER BY pr.version DESC")
    fun findAllByProductId(
        @Param("productId") productId: Long,
        pageable: Pageable
    ): Page<ProductRelease>
}