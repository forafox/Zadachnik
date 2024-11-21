package com.jellyone.zadachnik.domain

import jakarta.persistence.*
import lombok.Data

@Entity
@Table(name = "team")
@Data
data class Team(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(unique = true, nullable = false)
    val title: String,

    @ManyToOne
    @JoinColumn(name = "scrum_master", referencedColumnName = "id")
    val scrumMaster: User
)
