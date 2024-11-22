package com.jellyone.zadachnik.domain

import jakarta.persistence.*
import java.io.Serializable
import java.time.LocalDateTime

@Entity
@Table(name = "task_changes")
data class TaskChange(

    @EmbeddedId
    val id: TaskChangeId,

    @Column(name = "previous_value", nullable = false)
    var previousValue: String,

    @Column(name = "new_value", nullable = false)
    var newValue: String,

    @ManyToOne
    @JoinColumn(name = "changed_by", nullable = false)
    var changedBy: User,

    @Column(name = "changed_at", nullable = false, insertable = false, updatable = false)
    var changedAt: LocalDateTime
) : Serializable

@Embeddable
data class TaskChangeId(
    @Column(name = "task_id", nullable = false)
    val taskId: Long,

    @Column(name = "field_name", nullable = false)
    val fieldName: String,

    @Column(name = "changed_at", nullable = false)
    val changedAt: LocalDateTime
) : Serializable

