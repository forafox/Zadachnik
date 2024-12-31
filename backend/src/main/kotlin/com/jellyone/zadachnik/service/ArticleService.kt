package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Article
import com.jellyone.zadachnik.repository.ArticleRepository
import org.springframework.stereotype.Service

@Service
class ArticleService(
    val articleRepository: ArticleRepository
) {
    fun updateArticleById(
        id: Long,
        content: String
    ): Article {
        val article = articleRepository.findById(id)
            .orElseThrow { throw IllegalArgumentException("Article with id $id not found") }

        return articleRepository.save(article.copy(content = content))
    }
}