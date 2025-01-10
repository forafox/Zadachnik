package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.ProductRelease
import com.jellyone.zadachnik.repository.ProductReleaseRepository
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class ProductReleaseService(
    private val productReleaseRepository: ProductReleaseRepository,
    private val productService: ProductService,
    private val articleService: ArticleService,
    private val sprintService: SprintService,
    private val taskService: TaskService
) {
    fun createProductRelease(
        productId: Long,
        releaseNotes: String,
        version: String,
        sprintId: Long,
        username: String,
        tasksIds: List<Long>,
    ) = productReleaseRepository.save(
        ProductRelease(
            id = 0,
            version = version,
            product = productService.getProductById(productId),
            sprint = sprintService.getSprintById(sprintId),
            tasks = taskService.getTasksByIds(tasksIds).toMutableList(),
            notes = articleService.createArticleWithoutTeamMeeting(releaseNotes, username),
        )
    )


    fun getProductReleases(
        productId: Long,
        page: Int,
        size: Int
    ) = productReleaseRepository.findAllByProductId(productId, PageRequest.of(page, size))

    fun getProductRelease(productId: Long, releaseId: Long) = productReleaseRepository.findByProductIdAndId(productId, releaseId)
}

