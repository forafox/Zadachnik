package com.jellyone.zadachnik.domain

import jakarta.persistence.*

@Entity
@Table(name = "user_team")
data class UserTeamRelation(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: User,

    @ManyToOne
    @JoinColumn(name = "team_id")
    val team: Team,

    @Enumerated(EnumType.STRING)
    val status: UserTeamStatus
)

enum class UserTeamStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}