package com.jellyone.zadachnik.domain

import jakarta.persistence.*

@Entity
@Table(name = "product_teams")
data class ProductTeamRelation(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    val product: Product,

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    val team: Team,

    @Enumerated(EnumType.STRING)
    val status: ProductTeamStatus? = null,
)

enum class ProductTeamStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}
