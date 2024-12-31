package com.jellyone.zadachnik.domain

import jakarta.persistence.*

@Entity
@Table(name = "article")
data class Article(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val content: String,

    @ManyToOne
    @JoinColumn(name = "author")
    val author: User,

    @ManyToOne
    @JoinColumn(name = "team_meeting_id")
    val teamMeeting: TeamMeeting
)