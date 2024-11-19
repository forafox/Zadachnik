package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Product
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.ProductRepository
import org.springframework.stereotype.Service

@Service
class ProductService(
    private val productRepository: ProductRepository,
    private val userService: UserService,
) {
    fun createProduct(shortName: String, title: String?, description: String?, ownerUsername: String): Product {
        return productRepository.save(
            Product(
                id = 0,
                shortName = shortName,
                title = title,
                description = description,
                owner = userService.getByUsername(ownerUsername)
            )
        )
    }

    fun getProductById(id: Long): Product {
        return productRepository.findById(id).orElseThrow { ResourceNotFoundException("Product with id $id not found") }
    }
}