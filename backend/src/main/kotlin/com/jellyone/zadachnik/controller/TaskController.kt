package com.jellyone.zadachnik.controller

import com.jellyone.zadachnik.exception.ErrorMessage
import com.jellyone.zadachnik.service.TaskChangeService
import com.jellyone.zadachnik.service.TaskService
import com.jellyone.zadachnik.web.request.CreateTaskRequest
import com.jellyone.zadachnik.web.response.TaskChangeResponse
import com.jellyone.zadachnik.web.response.TaskResponse
import com.jellyone.zadachnik.web.response.toResponse
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import lombok.RequiredArgsConstructor
import org.springframework.data.domain.Page
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@SecurityRequirement(name = "JWT")
@RestController
@RequestMapping("/api/products/{productId}/tasks")
@RequiredArgsConstructor
@Validated
@Tag(name = "Tasks API")
@ApiResponses(
    ApiResponse(
        responseCode = "400",
        description = "Invalid input",
        content = [Content(schema = Schema(implementation = ErrorMessage::class), mediaType = "application/json")]
    )
)
class TaskController(
    private val taskService: TaskService,
    private val taskChangeService: TaskChangeService
) {
    @Operation(
        summary = "Create task",
        description = "Create a new task",
        operationId = "createTask",
        responses = [
            io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "Task is created",
                content = [
                    io.swagger.v3.oas.annotations.media.Content(
                        mediaType = "application/json",
                        schema = io.swagger.v3.oas.annotations.media.Schema(implementation = TaskResponse::class)
                    )
                ]
            )
        ]
    )
    @PostMapping
    fun createTask(
        @PathVariable productId: Long,
        @RequestBody request: CreateTaskRequest
    ): TaskResponse {
        return taskService.createTask(
            type = request.type,
            title = request.title,
            description = request.description,
            productId = productId
        ).toResponse()
    }

    @Operation(
        summary = "Get task by id",
        description = "Get task by id",
        responses = [
            ApiResponse(
                responseCode = "200",
                description = "Task successfully retrieved",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = TaskResponse::class)
                    )
                ]
            ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    @GetMapping("/{taskId}")
    fun getTaskById(@PathVariable taskId: Long, @PathVariable productId: Long): TaskResponse {
        return taskService.getTaskById(taskId).toResponse()
    }

    @Operation(
        summary = "Update task by id",
        description = "Update task by id",
        responses = [
            ApiResponse(
                responseCode = "200",
                description = "Task updated",
                content = [
                    Content(
                        mediaType = "application/json",
                        schema = Schema(implementation = TaskResponse::class)
                    )
                ]
            ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    @PutMapping("/{taskId}")
    fun updateTaskById(
        @PathVariable taskId: Long,
        @RequestBody request: CreateTaskRequest,
        @PathVariable productId: Long
    ): TaskResponse {
        return taskService.updateTaskById(
            id = taskId,
            type = request.type,
            title = request.title,
            description = request.description,
            productId = productId
        ).toResponse()
    }

    @Operation(
        summary = "Get task changes",
        description = "Get task changes",
        responses = [
            ApiResponse(
                responseCode = "200",
                description = "Task changes successfully retrieved",
                content = [Content(schema = Schema(implementation = Page::class), mediaType = "application/json")]
            ),
            ApiResponse(responseCode = "400", description = "Bad request"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    @GetMapping("/{taskId}/history")
    fun getTaskChanges(
        @PathVariable taskId: Long,
        @PathVariable productId: Long,
        @RequestParam(required = false, defaultValue = "0") page: Int,
        @RequestParam(required = false, defaultValue = "10") size: Int
    ): Page<TaskChangeResponse> {
        val changes = taskChangeService.getTaskChanges(taskId, page, size)
        return changes.map { it.toResponse() }
    }
}