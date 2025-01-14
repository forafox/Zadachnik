package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Task
import com.jellyone.zadachnik.domain.TaskChange
import com.jellyone.zadachnik.domain.TaskChangeId
import com.jellyone.zadachnik.domain.enums.TaskType
import com.jellyone.zadachnik.repository.TaskChangeRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class TaskChangeService(
    private val taskChangeRepository: TaskChangeRepository,
    private val userService: UserService,
) {

    fun getTaskChanges(taskId: Long, page: Int, size: Int): Page<TaskChange> {
        return taskChangeRepository.findByTaskIdOrderByChangedAtDesc(taskId, PageRequest.of(page, size))
    }

    fun logChanges(original: Task, updated: Task) {
        val changedBy = userService.getByUsername(SecurityContextHolder.getContext().authentication.name)

        if (original.type != updated.type) {
            createTaskChange(
                taskId = original.id,
                fieldName = "type",
                previousValue = original.type.name,
                newValue = updated.type.name,
                changedBy = changedBy.id
            )
        }
        if (original.title != updated.title) {
            createTaskChange(
                taskId = original.id,
                fieldName = "title",
                previousValue = original.title,
                newValue = updated.title,
                changedBy = changedBy.id
            )
        }
        if (original.description != updated.description) {
            createTaskChange(
                taskId = original.id,
                fieldName = "description",
                previousValue = original.description.orEmpty(),
                newValue = updated.description.orEmpty(),
                changedBy = changedBy.id
            )
        }
        if (original.product.id != updated.product.id) {
            createTaskChange(
                taskId = original.id,
                fieldName = "product",
                previousValue = original.product.id.toString(),
                newValue = updated.product.id.toString(),
                changedBy = changedBy.id
            )
        }

        if (original.assignee != updated.assignee) {
            createTaskChange(
                taskId = original.id,
                fieldName = "assignee",
                previousValue = original.assignee?.username,
                newValue = updated.assignee?.username,
                changedBy = changedBy.id
            )
        }

        if (original.status != updated.status) {
            createTaskChange(
                taskId = original.id,
                fieldName = "status",
                previousValue = original.status.name,
                newValue = updated.status.name,
                changedBy = changedBy.id
            )
        }
    }

    fun createTaskChange(taskId: Long, fieldName: String, previousValue: String?, newValue: String?, changedBy: Long) {
        taskChangeRepository.save(
            TaskChange(
                id = TaskChangeId(taskId, fieldName, LocalDateTime.now()),
                previousValue = previousValue,
                newValue = newValue,
                changedBy = userService.getById(changedBy),
                changedAt = LocalDateTime.now()
            )
        )
    }
}