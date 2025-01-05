package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.ProductTeamRelation
import com.jellyone.zadachnik.domain.ProductTeamStatus
import com.jellyone.zadachnik.repository.ProductTeamRelationRepository
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class ProductsInvitationsService(
    private val productTeamRelationRepository: ProductTeamRelationRepository,
    private val productService: ProductService,
    private val teamService: TeamService,
) {
    fun createProductInvitation(
        teamId: Long,
        productId: Long
    ): ProductTeamRelation {

        val product = productService.getProductById(productId)
        val team = teamService.getTeamById(teamId)

        val productTeamRelation = productTeamRelationRepository.findAllByStatus(ProductTeamStatus.PENDING)
        if(productTeamRelation.isNotEmpty()) {
            throw IllegalStateException("There are still unanswered requests")
        }

        return productTeamRelationRepository.save(
            ProductTeamRelation(
                id = 0,
                product = product,
                team = team,
                status = ProductTeamStatus.PENDING
            )
        )
    }

    fun updateProductInvitation(
        teamId: Long,
        productId: Long,
        status: ProductTeamStatus
    ): ProductTeamRelation {
        val productTeamRelation = productTeamRelationRepository.findAllByStatus(ProductTeamStatus.PENDING)
        if (productTeamRelation.size != 1) {
            throw IllegalStateException("There should be only one product invitation")
        }

        return productTeamRelationRepository.save(
            productTeamRelation.first().copy(
                status = status
            )
        )
    }

    fun getProductInvitation(
        teamId: Long,
        productId: Long,
        size: Int,
        page: Int
    ) = productTeamRelationRepository.findAllByProductIdAndTeamId(productId, teamId, PageRequest.of(page, size))
}