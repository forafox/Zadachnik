package com.jellyone.zadachnik.domain

import com.jellyone.zadachnik.domain.enums.TeamMeetingType
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "team_meeting")
data class TeamMeeting(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(name = "type", nullable = false)
    val type: TeamMeetingType,

    @Column(name = "agenda")
    val agenda: String,

    @Column(name = "date")
    val date: LocalDateTime,

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "id")
    val team: Team,
)
