package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.web.dto.auth.JwtRequest
import com.jellyone.zadachnik.web.dto.auth.JwtResponse

interface AuthService {
    fun login(loginRequest: JwtRequest): JwtResponse
    fun refresh(refreshToken: String): JwtResponse
}