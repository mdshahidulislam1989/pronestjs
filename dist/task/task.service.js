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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const notification_service_1 = require("../notification/notification.service");
const task_status_1 = require("../static/task-status");
const user_roles_1 = require("../static/user-roles");
const visit_states_1 = require("../static/visit-states");
const responses_1 = require("../utils/responses");
const typeorm_1 = require("typeorm");
let TaskService = class TaskService {
    constructor(dataSource, notificationService) {
        this.dataSource = dataSource;
        this.notificationService = notificationService;
    }
    async todaysTasks(authUser) {
        const [{ today }] = await this.dataSource.query(`SELECT DATE_FORMAT(CURRENT_DATE(), "%W, %b %d") AS today`);
        let tasks = [];
        if (authUser.selectedWorkspace.roleId == 3) {
            tasks = await this.dataSource
                .createQueryBuilder(db_1.Task, 't')
                .orderBy('t.id', 'DESC')
                .leftJoinAndSelect('t.taskMembers', 'tm')
                .leftJoinAndSelect('t.taskMembers', 'validateUser')
                .leftJoinAndSelect('tm.user', 'u')
                .select([
                't.id',
                't.status',
                't.name',
                't.description',
                't.startTime',
                't.endTime',
                't.lat',
                't.lng',
                't.address',
            ])
                .addSelect(['tm.id', 'tm.user'])
                .addSelect(['u.id', 'u.name', 'u.image'])
                .where('t.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
                .andWhere('t.startDate=CURRENT_DATE()')
                .andWhere('validateUser.userId=:validateUserId', { validateUserId: authUser.id })
                .getMany();
        }
        else {
            tasks = await this.dataSource
                .createQueryBuilder(db_1.Task, 't')
                .orderBy('t.id', 'DESC')
                .leftJoinAndSelect('t.taskMembers', 'tm')
                .leftJoinAndSelect('tm.user', 'u')
                .select([
                't.id',
                't.status',
                't.name',
                't.description',
                't.startTime',
                't.endTime',
                't.lat',
                't.lng',
                't.address',
            ])
                .addSelect(['tm.id', 'tm.user'])
                .addSelect(['u.id', 'u.name', 'u.image'])
                .where('t.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
                .andWhere('t.startDate=CURRENT_DATE()')
                .getMany();
        }
        return { today, tasks };
    }
    async tasks(authUser, status) {
        let tasks = [];
        if (authUser.selectedWorkspace.roleId == 3) {
            tasks = await this.dataSource
                .createQueryBuilder(db_1.Task, 't')
                .orderBy('t.id', 'DESC')
                .leftJoinAndSelect('t.taskMembers', 'tm')
                .leftJoinAndSelect('t.taskMembers', 'validateUser')
                .leftJoinAndSelect('tm.user', 'u')
                .select([
                't.id',
                't.status',
                't.name',
                't.totalVisit',
                't.expectedVisitNo',
                't.totalVisitDuration',
                't.startDate',
                't.endDate',
                't.lat',
                't.lng',
                't.address',
            ])
                .addSelect(['tm.id', 'tm.user'])
                .addSelect(['u.id', 'u.name', 'u.image'])
                .where('t.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
                .andWhere('t.status=:status', { status })
                .andWhere('validateUser.userId=:validateUserId', { validateUserId: authUser.id })
                .getMany();
        }
        else {
            tasks = await this.dataSource
                .createQueryBuilder(db_1.Task, 't')
                .orderBy('t.id', 'DESC')
                .leftJoinAndSelect('t.taskMembers', 'tm')
                .leftJoinAndSelect('tm.user', 'u')
                .select([
                't.id',
                't.status',
                't.name',
                't.totalVisit',
                't.expectedVisitNo',
                't.totalVisitDuration',
                't.startDate',
                't.endDate',
                't.lat',
                't.lng',
                't.address',
            ])
                .addSelect(['tm.id', 'tm.user'])
                .addSelect(['u.id', 'u.name', 'u.image'])
                .where('t.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
                .andWhere('t.status=:status', { status })
                .getMany();
        }
        return tasks;
    }
    async create(authUser, saveDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const task = await queryRunner.query(`
      INSERT INTO tasks(
        name,
        description,
        lat,
        lng,
        address,
        isMultipleVisit,
        expectedVisitNo,
        startDate,
        endDate,
        startTime,
        endTime,
        contactName,
        contactCountryCode,
        contactNo,
        contactAddress,
        status,
        totalVisit,
        categoryId,
        typeId,
        createdById,
        updatedById,
        workspaceId,
        organizationId
      )
      VALUES(
        ${saveDto.name ? `"${saveDto.name}"` : null},
        ${saveDto.description ? `"${saveDto.description}"` : null},
        ${saveDto.lat ? `"${saveDto.lat}"` : null},
        ${saveDto.lng ? `"${saveDto.lng}"` : null},
        ${saveDto.address ? `"${saveDto.address}"` : null},
        ${saveDto.isMultipleVisit ? saveDto.isMultipleVisit : false},
        ${saveDto.expectedVisitNo ? saveDto.expectedVisitNo : null},
        ${saveDto.startDate ? `"${saveDto.startDate}"` : 'CURDATE()'},
        ${saveDto.endDate ? `"${saveDto.endDate}"` : 'NULL'},
        ${saveDto.startTime ? `"${saveDto.startTime}"` : 'NULL'},
        ${saveDto.endTime ? `"${saveDto.endTime}"` : 'NULL'},
        ${saveDto.contactName ? `"${saveDto.contactName}"` : null},
        ${saveDto.contactCountryCode ? `"${saveDto.contactCountryCode}"` : null},
        ${saveDto.contactNo ? `"${saveDto.contactNo}"` : null},
        ${saveDto.contactAddress ? `"${saveDto.contactAddress}"` : null},
        ${1},
        ${0},
        ${saveDto.categoryId ? saveDto.categoryId : null},
        ${saveDto.typeId ? saveDto.typeId : null},
        ${authUser.id},
        ${authUser.id},
        ${authUser.selectedWorkspace.workspaceId},
        ${authUser.selectedWorkspace.organizationId}
      )
      `);
            let teamUserIds = [];
            if (saveDto.teamId) {
                const teamMembers = await queryRunner.manager
                    .createQueryBuilder(db_1.OrgTeamUser, 'otu')
                    .where('teamId = :teamId', { teamId: saveDto.teamId })
                    .select(['otu.userId'])
                    .getRawMany();
                if (teamMembers.length > 0) {
                    teamMembers.map(member => teamUserIds.push(parseInt(member.userId)));
                }
            }
            const filteredSingleUserIds = saveDto.userIds.filter(id => teamUserIds.indexOf(id) < 0);
            await Promise.all(teamUserIds.map(async (userId) => {
                await queryRunner.query(`
          INSERT INTO task_members(
            userId,
            taskId,
            addedById,
            teamId
        )
        VALUES(
          ${userId},
          ${task.insertId},
          ${authUser.id},
          ${saveDto.teamId}
        )
        `);
            }));
            await Promise.all(filteredSingleUserIds.map(async (userId) => {
                await queryRunner.query(`
          INSERT INTO task_members(
            userId,
            taskId,
            addedById
        )
        VALUES(
          ${userId},
          ${task.insertId},
          ${authUser.id}
        )
        `);
            }));
            await Promise.all(saveDto.attachments.map(async (attachment) => {
                await queryRunner.query(`
          INSERT INTO task_attachments (name, taskId, createdById) VALUES("${attachment}", ${task.insertId}, ${authUser.id})
          `);
            }));
            await this.notificationService.sendNotification([...filteredSingleUserIds, ...teamUserIds], {
                title: 'New Task Assigned!',
                body: `${saveDto.name} has been assigned to you.`,
                senderId: authUser.id,
                organizationId: authUser.selectedWorkspace.organizationId,
                workspaceId: authUser.selectedWorkspace.workspaceId,
            });
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Task created!', { taskId: task.insertId });
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not create task!');
        }
    }
    async getById(id) {
        const taskDetails = await this.dataSource.manager
            .createQueryBuilder(db_1.Task, 't')
            .where('t.id=:id', { id })
            .leftJoin('t.category', 'c')
            .leftJoin('t.type', 'ty')
            .leftJoin('t.createdBy', 'cb')
            .leftJoin('t.updatedBy', 'ub')
            .leftJoin('t.workspace', 'w')
            .leftJoin('t.organization', 'o')
            .leftJoin('t.attachments', 'a')
            .leftJoin('a.createdBy', 'acb')
            .select([
            't.id',
            't.name',
            't.description',
            't.lat',
            't.lng',
            't.address',
            't.isMultipleVisit',
            't.expectedVisitNo',
            't.startDate',
            't.endDate',
            't.startTime',
            't.endTime',
            't.contactName',
            't.contactCountryCode',
            't.contactNo',
            't.contactAddress',
            't.status',
            't.totalVisit',
            't.totalVisitDuration',
            't.createdAt',
            't.updatedAt',
            'c.id',
            'c.name',
            'ty.id',
            'ty.name',
            'cb.id',
            'cb.name',
            'ub.id',
            'ub.name',
            'w.id',
            'w.name',
            'o.id',
            'o.name',
            'a.id',
            'a.name',
            'acb.id',
            'acb.name',
        ])
            .getOne();
        const teamUsers = await this.dataSource.manager
            .createQueryBuilder(db_1.TaskMember, 'tm')
            .where('tm.taskId=:id', { id })
            .andWhere('tm.teamId IS NOT NULL')
            .leftJoin('tm.user', 'u')
            .leftJoin('tm.team', 't')
            .select(['u.id AS id', 'u.name AS name', 'u.image AS image', 't.id AS teamId', 't.name AS teamName'])
            .getRawMany();
        const team = teamUsers[0] ? { id: teamUsers[0].teamId, name: teamUsers[0].teamName } : null;
        const assignedUsers = await this.dataSource.manager
            .createQueryBuilder(db_1.TaskMember, 'tm')
            .where('tm.taskId=:id', { id })
            .andWhere('tm.teamId IS NULL')
            .leftJoin('tm.user', 'u')
            .select(['u.id AS id', 'u.name AS name', 'u.image AS image'])
            .getRawMany();
        return { ...taskDetails, team, teamUsers, assignedUsers };
    }
    async update(id, authUser, saveDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.query(`
      UPDATE tasks SET
        name =${saveDto.name ? `"${saveDto.name}"` : null},
        description = ${saveDto.description ? `"${saveDto.description}"` : null},
        lat = ${saveDto.lat ? `"${saveDto.lat}"` : null},
        lng = ${saveDto.lng ? `"${saveDto.lng}"` : null},
        address = ${saveDto.address ? `"${saveDto.address}"` : null},
        isMultipleVisit = ${saveDto.isMultipleVisit ? `"${saveDto.isMultipleVisit}"` : null},
        expectedVisitNo = ${saveDto.expectedVisitNo ? `"${saveDto.expectedVisitNo}"` : null},
        startDate = ${saveDto.startDate ? `"${saveDto.startDate}"` : null},
        endDate = ${saveDto.endDate ? `"${saveDto.endDate}"` : null},
        startTime = ${saveDto.startTime ? `"${saveDto.startTime}"` : null},
        endTime = ${saveDto.endTime ? `"${saveDto.endTime}"` : null},
        contactName = ${saveDto.contactName ? `"${saveDto.contactName}"` : null},
        contactCountryCode = ${saveDto.contactCountryCode ? `"${saveDto.contactCountryCode}"` : null},
        contactNo = ${saveDto.contactNo ? `"${saveDto.contactNo}"` : null},
        contactAddress = ${saveDto.contactAddress ? `"${saveDto.contactAddress}"` : null},
        categoryId = ${saveDto.categoryId ? saveDto.categoryId : null},
        typeId =  ${saveDto.typeId ? saveDto.typeId : null},
        updatedById =  ${authUser.id}
      WHERE id = ${id}
      `);
            if (saveDto.attachments.length > 0) {
                await queryRunner.query(`
      DELETE FROM task_attachments WHERE taskId=${id} AND BINARY name NOT IN (
        ${saveDto.attachments.map(att => `"${att}"`).join(', ')})
      `);
            }
            else {
                await queryRunner.query(`DELETE FROM task_attachments WHERE taskId=${id}`);
            }
            await Promise.all(saveDto.attachments.map(async (att) => {
                const count = await queryRunner.manager
                    .createQueryBuilder(db_1.TaskAttachment, 'ta')
                    .where('ta.taskId = :taskId', { taskId: id })
                    .andWhere('BINARY ta.name = :name', { name: att })
                    .getCount();
                if (count < 1) {
                    await queryRunner.manager.query(`INSERT INTO task_attachments (name, taskId, createdById) VALUES ("${att}", ${id}, ${authUser.id})`);
                }
            }));
            let teamUserIds = [];
            if (saveDto.teamId) {
                const teamMembers = await queryRunner.manager
                    .createQueryBuilder(db_1.OrgTeamUser, 'otu')
                    .where('teamId = :teamId', { teamId: saveDto.teamId })
                    .select(['otu.userId'])
                    .getRawMany();
                if (teamMembers.length > 0) {
                    teamMembers.map(member => teamUserIds.push(parseInt(member.userId)));
                }
            }
            const { oldTeamId } = (await queryRunner.manager
                .createQueryBuilder(db_1.TaskMember, 'tm')
                .where('tm.taskId=:taskId', { taskId: id })
                .andWhere('tm.teamId IS NOT null')
                .leftJoin('tm.team', 't')
                .select(['t.id AS oldTeamId'])
                .getRawOne()) || {};
            if (oldTeamId && oldTeamId != saveDto.teamId) {
                await queryRunner.query(`
        DELETE FROM task_members WHERE taskId=${id} AND teamId IS NOT NULL AND teamId=${oldTeamId}
        `);
            }
            if (teamUserIds.length > 0) {
                await queryRunner.query(`
        DELETE FROM task_members WHERE taskId=${id} AND teamId IS NOT NULL AND userId NOT IN (${teamUserIds.join(', ')})
        `);
            }
            else {
                await queryRunner.query(`
        DELETE FROM task_members WHERE taskId=${id} AND teamId IS NOT NULL
        `);
            }
            await Promise.all(teamUserIds.map(async (teamUserId) => {
                const count = await queryRunner.manager
                    .createQueryBuilder(db_1.TaskMember, 'tm')
                    .where('tm.taskId = :taskId', { taskId: id })
                    .andWhere('tm.userId = :userId', { userId: teamUserId })
                    .andWhere('tm.teamId = :teamId', { teamId: saveDto.teamId })
                    .getCount();
                if (count < 1) {
                    await queryRunner.manager.query(`INSERT INTO task_members (userId, taskId, addedById, teamId) VALUES (${teamUserId}, ${id}, ${authUser.id}, ${saveDto.teamId})`);
                }
            }));
            const filteredSingleUserIds = saveDto.userIds.filter(id => teamUserIds.indexOf(id) < 0);
            if (filteredSingleUserIds.length > 0) {
                await queryRunner.query(`
        DELETE FROM task_members WHERE taskId=${id} AND teamId IS NULL AND userId NOT IN 
        (${filteredSingleUserIds.join(', ')})
        `);
            }
            else {
                await queryRunner.query(`
        DELETE FROM task_members WHERE taskId=${id} AND teamId IS NULL
        `);
            }
            await Promise.all(filteredSingleUserIds.map(async (singleUserId) => {
                const count = await queryRunner.manager
                    .createQueryBuilder(db_1.TaskMember, 'tm')
                    .where('tm.taskId = :taskId', { taskId: id })
                    .andWhere('tm.userId = :userId', { userId: singleUserId })
                    .andWhere('tm.teamId IS NULL')
                    .getCount();
                if (count < 1) {
                    await queryRunner.manager.query(`INSERT INTO task_members (userId, taskId, addedById) VALUES (${singleUserId}, ${id}, ${authUser.id})`);
                }
            }));
            await this.notificationService.sendNotification([...filteredSingleUserIds, ...teamUserIds], {
                title: 'Task Updated!',
                body: `${saveDto.name} has been updated.`,
                senderId: authUser.id,
                organizationId: authUser.selectedWorkspace.organizationId,
                workspaceId: authUser.selectedWorkspace.workspaceId,
            });
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Task updated!');
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not update task!');
        }
    }
    async statusUpdate(id, authUser, status) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.query(`
      UPDATE tasks SET
          updatedById ="${authUser.id}",
          status ="${status}"
      WHERE
        id=${id}
    `);
            if (status == task_status_1.TaskStatuses.completed) {
                await queryRunner.manager.query(`
        UPDATE
            visits
        SET
            currentStateId = ${visit_states_1.VisitStates.out}
        WHERE
            taskId =${id}
      `);
            }
            let members = [];
            const tMembers = await queryRunner.manager.query(`SELECT tm.userId FROM task_members tm WHERE tm.taskId=${id}
    `);
            members = tMembers.map(({ userId }) => userId);
            const [t] = await queryRunner.manager.query(`SELECT t.name FROM tasks t WHERE t.id=${id}`);
            await this.notificationService.sendNotification(members, {
                title: 'Task Status Updated!',
                body: `${t.name} has been updated.`,
                senderId: authUser.id,
                organizationId: authUser.selectedWorkspace.organizationId,
                workspaceId: authUser.selectedWorkspace.workspaceId,
            });
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Status updated!');
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not update task status!');
        }
    }
    async delete(authUser, id) {
        if (authUser.selectedWorkspace.roleId == user_roles_1.UserRoles.user)
            return (0, responses_1.FailedResponse)('Only project owner and admin can delete task.');
        await this.dataSource.query(`DELETE FROM tasks where id=${id}`);
        return (0, responses_1.SuccessResponse)('Task deleted!');
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        notification_service_1.NotificationService])
], TaskService);
//# sourceMappingURL=task.service.js.map