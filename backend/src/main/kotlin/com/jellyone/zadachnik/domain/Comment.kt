package com.jellyone.zadachnik.domain

import jakarta.persistence.*

@Entity
@Table(name = "comment")
class Comment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    @JoinColumn(name = "author")
    val author: User,

    val content: String,

    @ManyToOne
    @JoinColumn(name = "article_id")
    val article: Article? = null,

    @ManyToOne
    @JoinColumn(name = "task_id")
    val task: Task? = null
)