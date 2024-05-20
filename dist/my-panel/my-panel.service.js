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
exports.MyPanelService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const task_status_1 = require("../static/task-status");
const visit_states_1 = require("../static/visit-states");
const typeorm_1 = require("typeorm");
let MyPanelService = class MyPanelService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getVisitsBy(authUser, all, startedOrResumed, paused, ended) {
        let stateCondition = '1=1';
        if (startedOrResumed)
            stateCondition = `(v.currentStateId=${visit_states_1.VisitStates.in} OR v.currentStateId=${visit_states_1.VisitStates.resume})`;
        if (paused)
            stateCondition = `v.currentStateId=${visit_states_1.VisitStates.pause}`;
        if (ended)
            stateCondition = `v.currentStateId=${visit_states_1.VisitStates.out}`;
        if (authUser.selectedWorkspace.roleId == 3) {
            return await this.dataSource
                .createQueryBuilder(db_1.Visit, 'v')
                .where('v.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
                .andWhere('v.userId=:userId', { userId: authUser.id })
                .andWhere(stateCondition)
                .leftJoin('v.task', 't')
                .leftJoin('v.user', 'u')
                .select([
                'v.id AS vId',
                'v.currentStateId AS currentStateId',
                'v.duration AS duration',
                'v.totalPauseTime AS totalPauseTime',
                'v.createdAt AS createdAt',
                'v.endedAt AS endedAt',
                't.id AS tId',
                't.name AS tName',
                'u.id AS uId',
                'u.name AS uName',
                'u.image AS uImage',
                `CASE WHEN (v.userId=${authUser.id} AND (v.currentStateId=${visit_states_1.VisitStates.in} OR v.currentStateId=${visit_states_1.VisitStates.resume})) THEN ${true} ELSE ${false} END AS isMyOnGoing`,
            ])
                .orderBy('isMyOnGoing', 'DESC')
                .getRawMany();
        }
        return await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .andWhere(stateCondition)
            .leftJoin('v.task', 't')
            .leftJoin('v.user', 'u')
            .select([
            'v.id AS vId',
            'v.currentStateId AS currentStateId',
            'v.duration AS duration',
            'v.totalPauseTime AS totalPauseTime',
            'v.createdAt AS createdAt',
            'v.endedAt AS endedAt',
            't.id AS tId',
            't.name AS tName',
            'u.id AS uId',
            'u.name AS uName',
            'u.image AS uImage',
            `CASE WHEN (v.userId=${authUser.id} AND (v.currentStateId=${visit_states_1.VisitStates.in} OR v.currentStateId=${visit_states_1.VisitStates.resume})) THEN ${true} ELSE ${false} END AS isMyOnGoing`,
        ])
            .orderBy('isMyOnGoing', 'DESC')
            .getRawMany();
    }
    async allTasksStatusCount(authUser) {
        if (authUser.selectedWorkspace.roleId == 3) {
            return await this.dataSource
                .createQueryBuilder(db_1.TaskMember, 'tm')
                .leftJoin('tm.task', 't')
                .where('tm.userId=:userId', { userId: authUser.id })
                .andWhere('t.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
                .select([
                `COUNT(CASE WHEN status=${task_status_1.TaskStatuses.pending} THEN 1 ELSE NULL END) as pending`,
                `COUNT(CASE WHEN status=${task_status_1.TaskStatuses.onGoing} THEN 1 ELSE NULL END) as onGoing`,
                `COUNT(CASE WHEN status=${task_status_1.TaskStatuses.completed} THEN 1 ELSE NULL END) as completed`,
            ])
                .getRawOne();
        }
        return await this.dataSource
            .createQueryBuilder(db_1.Task, 't')
            .where('t.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .select([
            `COUNT(CASE WHEN status=${task_status_1.TaskStatuses.pending} THEN 1 ELSE NULL END) as pending`,
            `COUNT(CASE WHEN status=${task_status_1.TaskStatuses.onGoing} THEN 1 ELSE NULL END) as onGoing`,
            `COUNT(CASE WHEN status=${task_status_1.TaskStatuses.completed} THEN 1 ELSE NULL END) as completed`,
        ])
            .getRawOne();
    }
    async allVisitsStatusCount(authUser) {
        if (authUser.selectedWorkspace.roleId == 3) {
            const [data] = await this.dataSource.query(`
      SELECT
        COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.in} THEN 1 ELSE NULL END) as started,
        COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.out} THEN 1 ELSE NULL END) as ended,
        COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.pause} THEN 1 ELSE NULL END) as paused,
        COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.resume} THEN 1 ELSE NULL END) as resumed
      FROM
          visits v
      WHERE
      v.userId = ${authUser.id} AND v.workspaceId = ${authUser.selectedWorkspace.workspaceId}
      `);
            return data;
        }
        const [data] = await this.dataSource.query(`
      SELECT
        COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.in} THEN 1 ELSE NULL END) as started,
        COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.out} THEN 1 ELSE NULL END) as ended,
        COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.pause} THEN 1 ELSE NULL END) as paused,
        COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.resume} THEN 1 ELSE NULL END) as resumed
      FROM
          visits v
      WHERE
      v.workspaceId = ${authUser.selectedWorkspace.workspaceId}
      `);
        return data;
    }
    async lastTeamTasksByLimit(authUser, limit) {
        return await this.dataSource
            .createQueryBuilder(db_1.TaskMember, 'tm')
            .where('tm.teamId IS NOT NULL')
            .andWhere('tm.userId=:userId', { userId: authUser.id })
            .leftJoin('tm.task', 't')
            .leftJoin('tm.team', 'team')
            .andWhere('t.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .select([
            't.id AS id',
            't.name AS name',
            't.endDate AS endDate',
            'tm.teamId AS teamId',
            'team.name AS teamName',
            `CASE WHEN 
          ROUND((t.totalVisit * 100) / t.expectedVisitNo) > 100 
          THEN 100 
          ELSE ROUND((t.totalVisit * 100) / t.expectedVisitNo) 
        END AS visitDonePercentage`,
        ])
            .addSelect(qb => {
            return qb
                .select('count(*)')
                .from(db_1.TaskMember, 'tmm')
                .where('tmm.teamId=tm.teamId')
                .andWhere('tmm.taskId=tm.taskId');
        }, 'totalMembers')
            .orderBy('tm.id', 'DESC')
            .limit(limit)
            .getRawMany();
    }
    async recentTasks(authUser, status, isToday) {
        return await this.dataSource
            .createQueryBuilder(db_1.Task, 't')
            .orderBy('t.id', 'DESC')
            .leftJoinAndSelect('t.taskMembers', 'tm')
            .leftJoinAndSelect('t.taskMembers', 'validateUser')
            .leftJoinAndSelect('tm.user', 'u')
            .select(['t.id', 't.name', 't.status', 't.startDate', 't.startTime'])
            .addSelect(['tm.id', 'tm.user'])
            .addSelect(['u.id', 'u.name', 'u.image'])
            .where('t.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .andWhere(`${isToday ? 't.startDate=CURRENT_DATE()' : '1=1'}`)
            .andWhere(`${status != 0 ? 't.status=:status' : '1=1'}`, { status })
            .andWhere('validateUser.userId=:validateUserId', { validateUserId: authUser.id })
            .getMany();
    }
};
exports.MyPanelService = MyPanelService;
exports.MyPanelService = MyPanelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], MyPanelService);
//# sourceMappingURL=my-panel.service.js.map