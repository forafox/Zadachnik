package com.jellyone.zadachnik.domain

import com.jellyone.zadachnik.domain.enums.TaskStatus
import jakarta.persistence.*
import java.io.Serializable

@Entity
@Table(name = "task")
data class Task(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false)
    var type: String,

    var title: String,

    var description: String? = null,

    @ManyToOne
    @JoinColumn(name = "assignee")
    val assignee: User,

    @Enumerated(EnumType.STRING)
    val status: TaskStatus,

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    var product: Product
) : Serializable
