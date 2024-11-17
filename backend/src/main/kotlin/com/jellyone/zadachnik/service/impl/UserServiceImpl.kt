package com.jellyone.zadachnik.service.impl

import com.jellyone.zadachnik.domain.User
import com.jellyone.zadachnik.domain.enums.Role
import com.jellyone.zadachnik.exception.ResourceAlreadyExistsException
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.UserRepository
import com.jellyone.zadachnik.service.UserService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) : UserService {

    override fun register(username: String, fullName: String, password: String) {

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

    override fun getById(id: Long) = userRepository.findById(id).get()

    override fun getByUsername(username: String): User {
        return userRepository.findByUsername(username)
            .orElseThrow { ResourceNotFoundException("User not found") }
    }

    private fun checkUserAlreadyExists(username: String) {
        if (userRepository.findByUsername(username).isPresent) {
            throw ResourceAlreadyExistsException("User already exists")
        }
    }

}