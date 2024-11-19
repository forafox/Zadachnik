package com.jellyone.zadachnik.domain

import jakarta.persistence.*
import lombok.Data

@Entity
@Table(name = "product")
class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    @Column(unique = true)
    val shortName: String,
    @Column
    val title: String?,
    @Column
    val description: String?,
    @ManyToOne
    @JoinColumn(name = "owner")
    val owner: User
)