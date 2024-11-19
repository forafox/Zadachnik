package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Product
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.ProductRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class ProductService(
    private val productRepository: ProductRepository,
    private val userService: UserService,
) {
    fun createProduct(ticker: String, title: String, description: String?, ownerUsername: String): Product {
        return productRepository.save(
            Product(
                id = 0,
                ticker = ticker,
                title = title,
                description = description,
                owner = userService.getByUsername(ownerUsername)
            )
        )
    }

    fun getProductById(id: Long): Product {
        return productRepository.findById(id).orElseThrow { ResourceNotFoundException("Product with id $id not found") }
    }

    fun updateProductById(
        id: Long,
        ticker: String,
        description: String?,
        title: String,
        ownerUsername: String
    ): Product {
        val product =
            productRepository.findById(id).orElseThrow { ResourceNotFoundException("Product with id $id not found") }
        return productRepository.save(
            product.copy(
                ticker = ticker,
                description = description,
                title = title,
                owner = userService.getByUsername(ownerUsername)
            )
        )
    }

    fun getProducts(
        page: Int,
        size: Int
    ): Page<Product> = productRepository.findAll(PageRequest.of(page, size))
}