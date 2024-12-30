package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Task
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface TaskRepository : JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

    @Query(
        """
            SELECT t FROM Task t 
            JOIN t.product p 
            JOIN Sprint s ON t MEMBER OF s.tasks
            WHERE s.id = :sprintId 
            AND (:assigneeId IS NULL OR t.assignee.id = :assigneeId) 
            AND (:productId IS NULL OR t.product.id = :productId) 
            AND (:status IS NULL OR t.status = :status)
        """
    )
    fun findSprintTasks(
        @Param("sprintId") sprintId: Long,
        @Param("assigneeId") assigneeId: Long?,
        @Param("productId") productId: Long?,
        @Param("status") status: String?,
        pageable: Pageable
    ): Page<Task>
}