package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Comment
import com.jellyone.zadachnik.repository.CommentRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class CommentService(
    private val commentRepository: CommentRepository,
    private val userService: UserService,
    private val articleService: ArticleService,
    private val taskService: TaskService
) {
    fun createComment(
        authorUsername: String,
        content: String,
        articleId: Long?,
        taskId: Long?
    ): Comment {
        val author = userService.getByUsername(authorUsername)

        val article = articleId?.let { articleService.getArticleById(it) }
        val task = taskId?.let { taskService.getTaskById(it) }

        return commentRepository.save(
            Comment(
                id = 0,
                author = author,
                content = content,
                article = article,
                task = task
            )
        )
    }

    fun getCommentsByTaskId(taskId: Long, page: Int, size: Int): Page<Comment> {
        return commentRepository.findAllByTaskId(taskId, PageRequest.of(page, size))
    }

    fun getCommentsByArticleId(articleId: Long, page: Int, size: Int): Page<Comment> {
        return commentRepository.findAllByArticleId(articleId, PageRequest.of(page, size))
    }

}