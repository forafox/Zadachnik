package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Product
import com.jellyone.zadachnik.domain.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import java.awt.print.Pageable

interface ProductRepository : JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    fun findAllByOwner(
        pageable: PageRequest,
        user: User,
    ): Page<Product>
}