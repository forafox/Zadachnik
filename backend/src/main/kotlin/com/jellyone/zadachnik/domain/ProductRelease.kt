package com.jellyone.zadachnik.domain

import jakarta.persistence.*

@Entity
@Table(name = "product_release")
class ProductRelease(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    val version: String,

    @ManyToOne
    @JoinColumn(name = "product_id")
    val product: Product,

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    val sprint: Sprint,

    @ManyToOne
    @JoinColumn(name = "notes")
    val notes: Article,

    @ManyToMany
    @JoinTable(
        name = "releases_tasks",
        joinColumns = [JoinColumn(name = "release_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "task_id", referencedColumnName = "id")]
    )
    val tasks: MutableList<Task> = mutableListOf()
)