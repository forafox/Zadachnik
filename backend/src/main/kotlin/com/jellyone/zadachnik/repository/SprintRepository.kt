package com.jellyone.zadachnik.repository

import com.jellyone.zadachnik.domain.Sprint
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SprintRepository: JpaRepository<Sprint, Long> {
}