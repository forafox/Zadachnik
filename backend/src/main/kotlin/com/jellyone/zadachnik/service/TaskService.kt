package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.ProductTeamStatus
import com.jellyone.zadachnik.domain.Task
import com.jellyone.zadachnik.domain.enums.TaskStatus
import com.jellyone.zadachnik.domain.enums.TaskType
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.ProductTeamRelationRepository
import com.jellyone.zadachnik.repository.TaskRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class TaskService(
    private val taskRepository: TaskRepository,
    private val productService: ProductService,
    private val taskChangeService: TaskChangeService,
    private val userService: UserService,
    private val productTeamRelationRepository: ProductTeamRelationRepository,
) {

    fun createTask(
        type: String,
        title: String,
        description: String?,
        productId: Long,
        status: String,
        assigneeId: Long?,
    ): Task {

        val assignee = assigneeId?.let { userService.getById(it) }

        return taskRepository.save(
            Task(
                id = 0,
                type = TaskType.valueOf(type),
                title = title,
                description = description,
                status = TaskStatus.valueOf(status),
                assignee = assignee,
                product = productService.getProductById(productId)
            )
        )
    }

    fun getTaskById(id: Long): Task {
        return taskRepository.findById(id).orElseThrow { ResourceNotFoundException("Task with id $id not found") }
    }

    fun updateTaskById(
        id: Long,
        type: String,
        title: String,
        description: String?,
        productId: Long,
        status: String,
        assigneeId: Long?,
    ): Task {
        val assignee = assigneeId?.let { userService.getById(it) }

        val task = taskRepository.findById(id).orElseThrow { ResourceNotFoundException("Task with id $id not found") }
        val updatedTask = task.copy(
            type = TaskType.valueOf(type),
            title = title,
            description = description,
            status = TaskStatus.valueOf(status),
            assignee = assignee,
            product = productService.getProductById(productId)
        )

        taskChangeService.logChanges(task, updatedTask)

        return taskRepository.save(updatedTask)
    }

    fun findSprintTasks(
        sprintId: Long,
        assigneeId: Long?,
        productId: Long?,
        status: String?,
        pageable: Pageable
    ): Page<Task> {
        return taskRepository.findSprintTasks(sprintId, assigneeId, productId,
            status?.let { TaskStatus.valueOf(it) }, pageable
        )
    }

    fun getTasksByIds(ids: List<Long>): List<Task> {
        return taskRepository.findAllById(ids)
    }

    fun getTasksByTeamId(teamId: Long): List<Task> {
        val productTeams = productTeamRelationRepository.findAllByTeamIdAndStatus(teamId, ProductTeamStatus.ACCEPTED)
        val productIds = productTeams.map { it.product.id }

        return taskRepository.findAllByProductIdIn(productIds)
    }
}
