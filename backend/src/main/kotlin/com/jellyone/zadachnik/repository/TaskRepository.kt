package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Task
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface TaskRepository : JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

}