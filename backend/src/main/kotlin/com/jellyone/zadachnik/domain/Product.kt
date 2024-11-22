package com.jellyone.zadachnik.domain

import jakarta.persistence.*

@Entity
@Table(name = "product")
data class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    @Column(unique = true, nullable = false)
    val ticker: String,
    @Column(nullable = false)
    val title: String,
    @Column
    val description: String?,
    @ManyToOne
    @JoinColumn(name = "owner")
    val owner: User
)