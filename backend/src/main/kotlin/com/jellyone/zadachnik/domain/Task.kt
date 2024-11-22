package com.jellyone.zadachnik.domain

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
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    var product: Product
) : Serializable
