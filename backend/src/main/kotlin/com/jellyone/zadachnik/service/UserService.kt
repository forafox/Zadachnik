package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.User
import com.jellyone.zadachnik.domain.enums.Role
import com.jellyone.zadachnik.exception.ResourceAlreadyExistsException
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {

    fun register(username: String, fullName: String, password: String) {

        checkUserAlreadyExists(username)

        val user = User(
            id = 0,
            username = username,
            fullName = fullName,
            password = passwordEncoder.encode(password),
            role = Role.USER
        )
        userRepository.save(user)
    }

    fun getById(id: Long): User {
        return userRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("User not found") }
    }

    fun getByUsername(username: String): User {
        return userRepository.findByUsername(username)
            .orElseThrow { ResourceNotFoundException("User not found") }
    }

    private fun checkUserAlreadyExists(username: String) {
        if (userRepository.findByUsername(username).isPresent) {
            throw ResourceAlreadyExistsException("User already exists")
        }
    }

    fun getUsers(search: String, page: Int, size: Int): Page<User> {
        val pageable: Pageable = PageRequest.of(page, size)
        return userRepository.findAll(getUserSearchSpecification(search), pageable)
    }

    private fun getUserSearchSpecification(search: String): Specification<User> {
        return Specification { root, _, criteriaBuilder ->
            if (search.isBlank()) {
                return@Specification null
            }
            val searchPattern = "%${search.lowercase()}%"
            criteriaBuilder.or(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("fullName")), searchPattern),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("username")), searchPattern)
            )
        }
    }
}