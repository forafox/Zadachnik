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
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class SprintService(
    private val sprintRepository: SprintRepository,
    private val taskService: TaskService,
    private val userService: UserService,
    private val teamService: TeamService,
    private val productService: ProductService,
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
        sprintId: Long,
        startAt: LocalDateTime,
        length: Int,
        tasksIds: List<Long>
    ): Sprint {
        val sprint =
            sprintRepository.findById(sprintId)
                .orElseThrow { ResourceNotFoundException("Sprint with id $sprintId not found") }

        val updatedSprint = sprint.copy(
            length = length,
            startAt = startAt,
            tasks = taskService.getTasksByIds(tasksIds).toMutableList()
        )

        return sprintRepository.save(updatedSprint)
    }

    fun updateMeeting(sprintId: Long, meetingType: TeamMeetingType, agenda: String, date: LocalDateTime): TeamMeeting {
        val sprint = sprintRepository.findById(sprintId)
            .orElseThrow { ResourceNotFoundException("Sprint with id $sprintId not found") }

        val updatedMeeting: TeamMeeting?

        val updatedSprint = when (meetingType) {
            TeamMeetingType.PLANNING -> {
                updatedMeeting =
                    meetingService.updateTeamMeetingById(sprint.planningMeeting.id, date, agenda)
                sprint.copy(planningMeeting = updatedMeeting)
            }

            TeamMeetingType.REVIEW -> {
                updatedMeeting = meetingService.updateTeamMeetingById(sprint.reviewMeeting.id, date, agenda)
                sprint.copy(reviewMeeting = updatedMeeting)
            }

            TeamMeetingType.RETROSPECTIVE -> {
                updatedMeeting = meetingService.updateTeamMeetingById(sprint.retroMeeting.id, date, agenda)
                sprint.copy(retroMeeting = updatedMeeting)
            }

            else -> throw IllegalArgumentException("Meeting type $meetingType is not supported for update.")
        }

        sprintRepository.save(updatedSprint)
        return updatedMeeting
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

    fun getSprintsByTeamId(teamId: Long, page: Int, pageSize: Int): Page<Sprint> {
        val pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "startAt"))
        return sprintRepository.findAllByTeamId(teamId, pageable)
    }

    fun getSprintsByProductId(productId: Long, page: Int, pageSize: Int): Page<Sprint> {
        return sprintRepository.findAllByProductId(productId, PageRequest.of(page, pageSize))
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