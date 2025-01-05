package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Article
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.ArticleRepository
import org.springframework.stereotype.Service

@Service
class ArticleService(
    val articleRepository: ArticleRepository,
    val userService: UserService
) {
    fun updateArticleById(
        id: Long,
        content: String
    ): Article {
        val article = articleRepository.findById(id)
            .orElseThrow { throw IllegalArgumentException("Article with id $id not found") }

        return articleRepository.save(article.copy(content = content))
    }

    fun getArticleById(id: Long): Article {
        return articleRepository.findById(id).orElseThrow { ResourceNotFoundException("Article with id $id not found") }
    }

    fun createArticleWithoutTeamMeeting(
        content: String,
        authorUsername: String
    ): Article {
        return articleRepository.save(
            Article(
                id = 0,
                content = content,
                author = userService.getByUsername(authorUsername),
                teamMeeting = null,
            )
        )
    }
}