package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Article
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ArticleRepository : JpaRepository<Article, Long> {
    fun findAllByTeamMeetingIdIn(id: List<Long>): List<Article>
}