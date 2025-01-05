package com.jellyone.zadachnik.domain

import jakarta.persistence.*

@Entity
@Table(name = "product_teams")
data class ProductTeamRelation(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne
    @JoinColumn(name = "product_id")
    val product: Product,

    @ManyToOne
    @JoinColumn(name = "team_id")
    val team: Team,

    @Enumerated(EnumType.STRING)
    val status: ProductTeamStatus,
)

enum class ProductTeamStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}
