package com.jellyone.zadachnik.service

import com.jellyone.zadachnik.domain.Sprint
import com.jellyone.zadachnik.domain.Task
import com.jellyone.zadachnik.domain.Team
import com.jellyone.zadachnik.domain.TeamMeeting
import com.jellyone.zadachnik.domain.enums.TeamMeetingType
import com.jellyone.zadachnik.exception.ResourceNotFoundException
import com.jellyone.zadachnik.repository.SprintRepository
import com.jellyone.zadachnik.web.dto.SprintModel
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class SprintService(
    private val sprintRepository: SprintRepository,
    private val taskService: TaskService,
    private val userService: UserService,
    private val teamService: TeamService,
    private val meetingService: TeamMeetingService
) {
    fun createSprint(teamId: Long, sprintModel: SprintModel): Sprint {

        val team = teamService.getTeamById(teamId)
        val tasks = taskService.getTasksByIds(sprintModel.tasksIds)

        return sprintRepository.save(
            Sprint(
                id = 0,
                length = sprintModel.length,
                startAt = sprintModel.startAt,
                team = team,
                planningMeeting = createPlanningMeeting(team, sprintModel),
                reviewMeeting = createReviewMeeting(team, sprintModel),
                retroMeeting = createRetroMeeting(team, sprintModel),
                tasks = tasks.toMutableList()
            )
        )
    }

    fun getSprintById(id: Long): Sprint {
        return sprintRepository.findById(id).orElseThrow { ResourceNotFoundException("Sprint with id $id not found") }
    }

    fun updateSprintById(
        id: Long,
        sprintModel: SprintModel
    ): Sprint {
        val sprint =
            sprintRepository.findById(id).orElseThrow { ResourceNotFoundException("Sprint with id $id not found") }

        val planingMeeting =
            meetingService.updateTeamMeetingById(sprint.planningMeeting.id, sprint.planningMeeting.date)
        val reviewMeeting = meetingService.updateTeamMeetingById(sprint.reviewMeeting.id, sprint.reviewMeeting.date)
        val retroMeeting = meetingService.updateTeamMeetingById(sprint.retroMeeting.id, sprint.retroMeeting.date)

        val updatedSprint = sprint.copy(
            planningMeeting = planingMeeting,
            reviewMeeting = reviewMeeting,
            retroMeeting = retroMeeting,
            length = sprintModel.length,
            startAt = sprintModel.startAt,
            tasks = taskService.getTasksByIds(sprintModel.tasksIds).toMutableList()
        )

        return sprintRepository.save(updatedSprint)
    }

    fun getSprintTasksByTeamIdAndSprintId(
        sprintId: Long,
        assigneeId: Long?,
        productId: Long?,
        status: String?,
        pageable: Pageable
    ): Page<Task> {
        sprintRepository.findById(sprintId)
            .orElseThrow { ResourceNotFoundException("Sprint with id $sprintId not found") }

        val tasksPage = taskService.findSprintTasks(sprintId, assigneeId, productId, status, pageable)

        return tasksPage
    }

    private fun createPlanningMeeting(team: Team, sprint: SprintModel) = meetingService.createTeamMeeting(
        type = TeamMeetingType.PLANNING,
        agenda = TeamMeetingType.PLANNING.name,
        date = sprint.planningDateTime,
        teamId = team.id
    )


    private fun createReviewMeeting(team: Team, sprint: SprintModel) =
        meetingService.createTeamMeeting(
            type = TeamMeetingType.REVIEW,
            agenda = TeamMeetingType.REVIEW.name,
            date = sprint.reviewDateTime,
            teamId = team.id
        )

    private fun createRetroMeeting(team: Team, sprint: SprintModel) = meetingService.createTeamMeeting(
        type = TeamMeetingType.RETROSPECTIVE,
        agenda = TeamMeetingType.RETROSPECTIVE.name,
        date = sprint.retroDateTime,
        teamId = team.id
    )
}