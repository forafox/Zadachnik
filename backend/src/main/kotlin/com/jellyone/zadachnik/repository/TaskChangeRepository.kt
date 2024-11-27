package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.TaskChange
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.jpa.repository.Query

interface TaskChangeRepository : JpaRepository<TaskChange, Long>, JpaSpecificationExecutor<TaskChange> {

    @Query("SELECT t FROM TaskChange t WHERE t.id.taskId = :taskId ORDER BY t.id.changedAt DESC")
    fun findByTaskIdOrderByChangedAtDesc(taskId: Long, pageable: Pageable): Page<TaskChange>
}
