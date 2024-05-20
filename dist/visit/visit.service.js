"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const notification_service_1 = require("../notification/notification.service");
const task_status_1 = require("../static/task-status");
const visit_states_1 = require("../static/visit-states");
const date_time_formats_1 = require("../utils/date-time-formats");
const responses_1 = require("../utils/responses");
const typeorm_1 = require("typeorm");
let VisitService = class VisitService {
    constructor(dataSource, notificationService) {
        this.dataSource = dataSource;
        this.notificationService = notificationService;
    }
    async taskMyLastVisitCurrentState(authUser, taskId) {
        return await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.userId=:userId', { userId: authUser.id })
            .andWhere('v.taskId=:taskId', { taskId })
            .select([
            'v.id AS visitId',
            'v.createdAt AS createdAt',
            'v.endedAt AS endedAt',
            'v.duration AS duration',
            'v.totalPauseTime AS totalPauseTime',
            'v.currentStateId AS currentStateId',
            'v.taskId AS taskId',
        ])
            .orderBy('v.id', 'DESC')
            .getRawOne();
    }
    async instantVisit(authUser, instantVisitDto) {
        if (await this.isAnyVisitIsInProgress(authUser.id, authUser.selectedWorkspace.workspaceId))
            return (0, responses_1.FailedResponse)('You are already on a visit in this project! Please pause or end it first.');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const task = await queryRunner.manager.query(`
      INSERT INTO tasks(
        name,
        lat,
        lng,
        address,
        startDate,
        startTime,
        status,
        totalVisit,
        createdById,
        updatedById,
        workspaceId,
        organizationId,
        isInstantVisit
      )
      VALUES(
        "${instantVisitDto.taskName}",
        "${instantVisitDto.lat}",
        "${instantVisitDto.lng}",
        "${instantVisitDto.address}",
        CURDATE(),
        CURTIME(),
        ${task_status_1.TaskStatuses.onGoing},
        1,
        ${authUser.id},
        ${authUser.id},
        ${authUser.selectedWorkspace.workspaceId},
        ${authUser.selectedWorkspace.organizationId},
        1
      )
      `);
            await queryRunner.manager.query(`
      INSERT INTO task_members(
        userId,
        taskId,
        addedById
      )
      VALUES(
        ${authUser.id},
        ${task.insertId},
        ${authUser.id}
      )
      `);
            const visit = await queryRunner.manager.query(`
        INSERT INTO visits(
            currentStateId,
            userId,
            taskId,
            workspaceId,
            organizationId
        )
        VALUES(
            ${visit_states_1.VisitStates.in},
            ${authUser.id},
            ${task.insertId},
            ${authUser.selectedWorkspace.workspaceId},
            ${authUser.selectedWorkspace.organizationId}
        )
        `);
            await queryRunner.manager.query(`
        INSERT INTO visit_states(
            stateId,
            lat,
            lng,
            address,
            visitId
        )
        VALUES(
            ${visit_states_1.VisitStates.in},
            "${instantVisitDto.lat}",
            "${instantVisitDto.lng}",
            "${instantVisitDto.address}",
            ${visit.insertId}
        )`);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Visit started!', { taskId: task.insertId });
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not start visit!');
        }
    }
    async visitIn(authUser, taskId, saveDto) {
        if (await this.isTaskCompleted(taskId))
            return (0, responses_1.FailedResponse)('You can not visit as this task is already completed.');
        if (await this.isAnyVisitIsInProgress(authUser.id, authUser.selectedWorkspace.workspaceId))
            return (0, responses_1.FailedResponse)('You are already on a visit in this project! Please pause or end it first.');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const [{ teamId }] = await queryRunner.query(`SELECT tm.teamId FROM task_members tm WHERE tm.userId=${authUser.id} AND tm.taskId=${taskId}`);
            const visit = await queryRunner.manager.query(`
        INSERT INTO visits(
            endedAt,
            duration,
            totalPauseTime,
            currentStateId,
            userId,
            taskId,
            workspaceId,
            organizationId,
            teamId
        )
        VALUES(
            ${null},
            ${0},
            ${0},
            ${visit_states_1.VisitStates.in},
            ${authUser.id},
            ${taskId},
            ${authUser.selectedWorkspace.workspaceId},
            ${authUser.selectedWorkspace.organizationId},
            ${teamId}
        )
        `);
            const visitState = await queryRunner.manager.query(`
        INSERT INTO visit_states(
            stateId,
            lat,
            lng,
            address,
            comment,
            visitId
        )
        VALUES(
            ${visit_states_1.VisitStates.in},
            "${saveDto.lat}",
            "${saveDto.lng}",
            "${saveDto.address}",
            "${saveDto.comment}",
            ${visit.insertId}
        )`);
            if (saveDto.attachments?.length > 0) {
                await Promise.all(saveDto.attachments.map(async (att) => {
                    await queryRunner.manager.query(`
                INSERT INTO visit_attachments(
                    name,
                    visitStateId,
                    createdById
                )
                VALUES(
                    "${att}",
                    ${visitState.insertId},
                    ${authUser.id}
                )
                `);
                }));
            }
            await queryRunner.manager.query(`
      UPDATE
        tasks
      SET
        status= ${task_status_1.TaskStatuses.onGoing},
        totalVisit = totalVisit + 1
      WHERE
          id = ${taskId}
      `);
            let members = [];
            const tMembers = await queryRunner.manager.query(`SELECT tm.userId FROM task_members tm WHERE tm.taskId=${taskId}
    `);
            members = tMembers.map(({ userId }) => userId);
            const [t] = await queryRunner.manager.query(`SELECT t.name FROM tasks t WHERE t.id=${taskId}`);
            await this.notificationService.sendNotification(members, {
                title: `New Visit for ${t.name}!`,
                body: `Started at ${saveDto.address}.`,
                senderId: authUser.id,
                organizationId: authUser.selectedWorkspace.organizationId,
                workspaceId: authUser.selectedWorkspace.workspaceId,
            });
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Visit started!');
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Only assigned members can start visits!');
        }
    }
    async visitPause(authUser, visitId, taskId, saveDto) {
        if (await this.isTaskCompleted(taskId))
            return (0, responses_1.FailedResponse)('You can not pause as this task is already completed.');
        if (await this.isVisitCurrentStateIdMatched(visitId, visit_states_1.VisitStates.pause))
            return (0, responses_1.FailedResponse)('Visit already paused!');
        if (!(await this.isVisitIsInProgress(visitId)))
            return (0, responses_1.FailedResponse)('This task is not in progress!');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.updateLastVisitStateDuration(visitId, queryRunner);
            await queryRunner.manager.query(`
      UPDATE
        visits
      SET
        duration = (SELECT SUM(duration) FROM visit_states WHERE visitId=${visitId}),
        currentStateId = ${visit_states_1.VisitStates.pause}
      WHERE
          id = ${visitId}
      `);
            const visitState = await queryRunner.manager.query(`
        INSERT INTO visit_states(
            stateId,
            lat,
            lng,
            address,
            comment,
            visitId
        )
        VALUES(
            ${visit_states_1.VisitStates.pause},
            "${saveDto.lat}",
            "${saveDto.lng}",
            "${saveDto.address}",
            "${saveDto.comment}",
            ${visitId}
        )`);
            if (saveDto.attachments?.length > 0) {
                await Promise.all(saveDto.attachments.map(async (att) => {
                    await queryRunner.manager.query(`
                INSERT INTO visit_attachments(
                    name,
                    visitStateId,
                    createdById
                )
                VALUES(
                    "${att}",
                    ${visitState.insertId},
                    ${authUser.id}
                )
                `);
                }));
            }
            await this.updateTaskTotalVisitDuration(taskId, queryRunner);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Visit paused!');
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not pause visit!');
        }
    }
    async visitResume(authUser, visitId, taskId, saveDto) {
        const { currentStateId } = await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.id=:visitId', { visitId })
            .select(['v.currentStateId'])
            .getOne();
        if (currentStateId == visit_states_1.VisitStates.out)
            return (0, responses_1.FailedResponse)('This visit already ended!');
        if (await this.isTaskCompleted(taskId))
            return (0, responses_1.FailedResponse)('You can not resume as this task is already completed.');
        if (await this.isVisitCurrentStateIdMatched(visitId, visit_states_1.VisitStates.resume))
            return (0, responses_1.FailedResponse)('Visit already resumed!');
        if (await this.isAnyVisitIsInProgress(authUser.id, authUser.selectedWorkspace.workspaceId))
            return (0, responses_1.FailedResponse)('You are already on a visit in this project! Please pause or end it first.');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.updateLastVisitStateDuration(visitId, queryRunner);
            const visitState = await queryRunner.manager.query(`
        INSERT INTO visit_states(
            stateId,
            lat,
            lng,
            address,
            comment,
            visitId
        )
        VALUES(
            ${visit_states_1.VisitStates.resume},
            "${saveDto.lat}",
            "${saveDto.lng}",
            "${saveDto.address}",
            "${saveDto.comment}",
            ${visitId}
        )`);
            if (saveDto.attachments?.length > 0) {
                await Promise.all(saveDto.attachments.map(async (att) => {
                    await queryRunner.manager.query(`
                INSERT INTO visit_attachments(
                    name,
                    visitStateId,
                    createdById
                )
                VALUES(
                    "${att}",
                    ${visitState.insertId},
                    ${authUser.id}
                )
                `);
                }));
            }
            const { lastPausedAt } = await queryRunner.manager
                .createQueryBuilder(db_1.VisitState, 'vs')
                .where('vs.visitId=:visitId', { visitId })
                .andWhere('vs.stateId=:stateId', { stateId: visit_states_1.VisitStates.pause })
                .orderBy('vs.id', 'DESC')
                .select(['vs.createdAt AS lastPausedAt'])
                .getRawOne();
            const { lastResumedAt } = await queryRunner.manager
                .createQueryBuilder(db_1.VisitState, 'vs')
                .where('vs.visitId=:visitId', { visitId })
                .andWhere('vs.stateId=:stateId', { stateId: visit_states_1.VisitStates.resume })
                .orderBy('vs.id', 'DESC')
                .select(['vs.createdAt AS lastResumedAt'])
                .getRawOne();
            const lastPauseDuration = (0, date_time_formats_1.getDateTimeDiffInSeconds)(new Date(lastResumedAt?.toString()), new Date(lastPausedAt?.toString())) || 0;
            await queryRunner.manager.query(`
      UPDATE
        visits
      SET
        duration = (SELECT SUM(duration) FROM visit_states WHERE visitId=${visitId}),
        totalPauseTime = totalPauseTime + ${lastPauseDuration},
        currentStateId = ${visit_states_1.VisitStates.resume}
      WHERE
          id = ${visitId}
      `);
            await this.updateTaskTotalVisitDuration(taskId, queryRunner);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Visit resumed!');
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not resume visit!');
        }
    }
    async visitOut(authUser, visitId, taskId, saveDto) {
        if (await this.isTaskCompleted(taskId))
            return (0, responses_1.FailedResponse)('You can not finish as this task is already completed.');
        if (await this.isVisitCurrentStateIdMatched(visitId, visit_states_1.VisitStates.out))
            return (0, responses_1.FailedResponse)('Visit already finished!');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.updateLastVisitStateDuration(visitId, queryRunner);
            await queryRunner.manager.query(`UPDATE 
          tasks 
        SET 
          STATUS = ${task_status_1.TaskStatuses.completed},
          endDate = CURDATE(),
          endTime = CURTIME()
          WHERE id = ${taskId} AND isInstantVisit = 1`);
            await queryRunner.manager.query(`
      UPDATE
        visits
      SET
        endedAt = CURRENT_TIMESTAMP(),
        duration = (SELECT SUM(duration) FROM visit_states WHERE visitId=${visitId}),
        currentStateId = ${visit_states_1.VisitStates.out}
      WHERE
          id = ${visitId}
      `);
            const visitState = await queryRunner.manager.query(`
        INSERT INTO visit_states(
            stateId,
            lat,
            lng,
            address,
            comment,
            visitId
        )
        VALUES(
            ${visit_states_1.VisitStates.out},
            "${saveDto.lat}",
            "${saveDto.lng}",
            "${saveDto.address}",
            "${saveDto.comment}",
            ${visitId}
        )`);
            if (saveDto.attachments?.length > 0) {
                await Promise.all(saveDto.attachments.map(async (att) => {
                    await queryRunner.manager.query(`
                INSERT INTO visit_attachments(
                    name,
                    visitStateId,
                    createdById
                )
                VALUES(
                    "${att}",
                    ${visitState.insertId},
                    ${authUser.id}
                )
                `);
                }));
            }
            await this.updateTaskTotalVisitDuration(taskId, queryRunner);
            let members = [];
            const tMembers = await queryRunner.manager.query(`SELECT tm.userId FROM task_members tm WHERE tm.taskId=${taskId}
    `);
            members = tMembers.map(({ userId }) => userId);
            const [t] = await queryRunner.manager.query(`SELECT t.name FROM tasks t WHERE t.id=${taskId}`);
            await this.notificationService.sendNotification(members, {
                title: `Finish Visit for ${t.name}!`,
                body: `Finished at ${saveDto.address}.`,
                senderId: authUser.id,
                organizationId: authUser.selectedWorkspace.organizationId,
                workspaceId: authUser.selectedWorkspace.workspaceId,
            });
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Visit finished!');
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not finish visit!');
        }
    }
    async taskVisits(taskId, stateId) {
        return await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.taskId=:taskId', { taskId })
            .andWhere(`v.currentStateId ${stateId == 0 ? 'IS NOT NULL' : '=' + stateId}`)
            .leftJoin('v.user', 'u')
            .leftJoin('v.states', 'vs')
            .leftJoin('v.task', 't')
            .leftJoin('vs.attachments', 'att')
            .orderBy('vs.id', 'DESC')
            .select([
            't.id',
            't.name',
            't.lat',
            't.lng',
            't.address',
            'u.id',
            'u.name',
            'u.image',
            'v.id',
            'v.createdAt',
            'v.endedAt',
            'v.duration',
            'v.totalPauseTime',
            'v.currentStateId',
            'vs.id',
            'vs.stateId',
            'vs.duration',
            'vs.comment',
            'vs.lat',
            'vs.lng',
            'vs.address',
            'vs.createdAt',
            'att.id',
            'att.name',
        ])
            .getMany();
    }
    async isTaskCompleted(taskId) {
        const [row] = await this.dataSource.query(`
    SELECT t.status AS taskStatus FROM tasks t WHERE t.id=${taskId}
    `);
        if (task_status_1.TaskStatuses.completed == row?.taskStatus)
            return true;
        else
            return false;
    }
    async isAnyVisitIsInProgress(userId, workspaceId) {
        const [row] = await this.dataSource.query(`
    SELECT 
    COUNT(*) AS progressCount 
    FROM
        visits v
    WHERE
        v.userId = ${userId} AND v.workspaceId = ${workspaceId} AND (v.currentStateId = ${visit_states_1.VisitStates.in} OR v.currentStateId = ${visit_states_1.VisitStates.resume})
    `);
        if (row?.progressCount > 0)
            return true;
        else
            return false;
    }
    async isVisitIsInProgress(visitId) {
        const [row] = await this.dataSource.query(`
    SELECT 
    COUNT(*) AS count 
    FROM
        visits v
    WHERE
        v.id = ${visitId} AND (v.currentStateId = ${visit_states_1.VisitStates.in} OR v.currentStateId = ${visit_states_1.VisitStates.resume})
    `);
        if (row?.count > 0)
            return true;
        else
            return false;
    }
    async isVisitCurrentStateIdMatched(visitId, stateIdToMatch) {
        const [row] = await this.dataSource.query(`
    SELECT v.currentStateId FROM visits v WHERE v.id=${visitId}
    `);
        if (row?.currentStateId == stateIdToMatch)
            return true;
        else
            return false;
    }
    async updateLastVisitStateDuration(visitId, queryRunner) {
        const [row] = await queryRunner.manager.query(`
    SELECT vs.id, vs.createdAt, vs.duration FROM visit_states vs WHERE vs.visitId=${visitId} ORDER BY vs.id DESC LIMIT 1
    `);
        if (row) {
            await queryRunner.manager.query(`
      UPDATE visit_states SET duration = ${(0, date_time_formats_1.getDateTimeDiffInSeconds)(new Date(), new Date(row?.createdAt?.toString()))} WHERE id=${row?.id}
      `);
        }
    }
    async updateTaskTotalVisitDuration(taskId, queryRunner) {
        await queryRunner.manager.query(`
    UPDATE
    tasks
    SET
        totalVisitDuration = (SELECT SUM(v.duration) - SUM(v.totalPauseTime) AS totalVisitDuration FROM visits v WHERE v.taskId=${taskId})
    WHERE
        id=${taskId}
    `);
    }
};
exports.VisitService = VisitService;
exports.VisitService = VisitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        notification_service_1.NotificationService])
], VisitService);
//# sourceMappingURL=visit.service.js.map