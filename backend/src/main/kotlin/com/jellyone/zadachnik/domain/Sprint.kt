package com.jellyone.zadachnik.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "sprint")
data class Sprint(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column
    val length: Int,

    @Column(name = "start_at")
    val startAt: LocalDateTime,

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "id")
    val team: Team,

    @OneToOne(cascade = [CascadeType.ALL])
    @JoinColumn(name = "planning_meeting", referencedColumnName = "id")
    val planningMeeting: TeamMeeting,

    @OneToOne(cascade = [CascadeType.ALL])
    @JoinColumn(name = "review_meeting", referencedColumnName = "id")
    val reviewMeeting: TeamMeeting,

    @OneToOne(cascade = [CascadeType.ALL])
    @JoinColumn(name = "retro_meeting", referencedColumnName = "id")
    val retroMeeting: TeamMeeting,

    @ManyToMany
    @JoinTable(
        name = "sprint_tasks",
        joinColumns = [JoinColumn(name = "sprint_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "task_id", referencedColumnName = "id")]
    )
    val tasks: MutableList<Task> = mutableListOf()
)
