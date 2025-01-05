package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Product
import com.jellyone.zadachnik.domain.Task
import com.jellyone.zadachnik.domain.User
import com.jellyone.zadachnik.domain.enums.TaskStatus
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.awt.print.Pageable

interface ProductRepository : JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    fun findAllByOwner(
        pageable: PageRequest,
        user: User,
    ): Page<Product>

    @Query(
        """
            SELECT t FROM Task t 
            JOIN t.product p 
            WHERE p.id = :productId 
            AND (:assigneeId IS NULL OR t.assignee.id = :assigneeId) 
            AND (:teamId IS NULL OR t.product.owner.id = :teamId) 
            AND (:status IS NULL OR t.status = :status)
        """
    )
    fun findProductTasks(
        @Param("productId") productId: Long,
        @Param("assigneeId") assigneeId: Long?,
        @Param("teamId") teamId: Long?,
        @Param("status") status: TaskStatus?,
        pageable: org.springframework.data.domain.Pageable
    ): Page<Task>
}