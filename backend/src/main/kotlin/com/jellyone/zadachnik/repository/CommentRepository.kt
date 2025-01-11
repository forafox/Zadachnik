package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Comment
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface CommentRepository : JpaRepository<Comment, Long> {
    fun findAllByTaskId(taskId: Long, pageable: Pageable): Page<Comment>

    fun findAllByArticleId(articleId: Long, pageable: Pageable): Page<Comment>

    @Query(
        """
            SELECT c FROM Comment c
            WHERE c.article.id IN (
                SELECT a.id FROM Article a
                WHERE a.teamMeeting.team.id = :teamId
            )
        """
    )
    fun findAllByTeamId(teamId: Long, pageable: Pageable): Page<Comment>

}