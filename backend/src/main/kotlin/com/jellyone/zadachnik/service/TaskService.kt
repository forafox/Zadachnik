package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Task
import com.jellyone.zadachnik.domain.enums.TaskStatus
import com.jellyone.zadachnik.exception.ResourceNotFoundException
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
    private val userService: UserService
) {

    fun createTask(
        type: String,
        title: String,
        description: String?,
        productId: Long,
        status: String,
        username: String
    ): Task {
        val user = userService.getByUsername(username)

        return taskRepository.save(
            Task(
                id = 0,
                type = type,
                title = title,
                description = description,
                status = TaskStatus.valueOf(status),
                assignee = user,
                product = productService.getProductById(productId)
            )
        ).also { taskChangeService.createLogChanges(it) }
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
    ): Task {
        val task = taskRepository.findById(id).orElseThrow { ResourceNotFoundException("Task with id $id not found") }
        val updatedTask = task.copy(
            type = type,
            title = title,
            description = description,
            status = TaskStatus.valueOf(status),
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
        return taskRepository.findSprintTasks(sprintId, assigneeId, productId, status, pageable)
    }

    fun getTasksByIds(ids: List<Long>): List<Task> {
        return taskRepository.findAllById(ids)
    }
}
