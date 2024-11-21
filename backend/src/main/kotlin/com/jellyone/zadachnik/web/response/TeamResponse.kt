package com.jellyone.zadachnik.web.response

import com.jellyone.zadachnik.domain.Team

data class TeamResponse(
    val id: Long,
    val title: String,
    val scrumMaster: UserResponse
)

fun Team.toResponse() = TeamResponse(
    id = id,
    title = title,
    scrumMaster = scrumMaster.toResponse()
)