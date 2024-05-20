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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const task_status_1 = require("../static/task-status");
const visit_states_1 = require("../static/visit-states");
const typeorm_1 = require("typeorm");
let ReportService = class ReportService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async myReports(authUser, month, year) {
        const [visit] = await this.dataSource.query(`
    SELECT
        COUNT(v.id) AS totalVisit,
        COUNT(DISTINCT v.taskId) AS totalTask,
        IFNULL(
            (
                SUM(v.duration) - SUM(v.totalPauseTime)
            ),
            0
        ) AS totalWorkingTime
    FROM
        visits v
    LEFT JOIN tasks t ON
        t.id = v.taskId
    WHERE
        v.userId = ${authUser.id} AND v.workspaceId = ${authUser.selectedWorkspace.workspaceId} AND MONTH(v.updatedAt) = ${month} AND YEAR(v.updatedAt) = ${year}
    `);
        const [taskStatus] = await this.dataSource.query(`
    select
        COUNT(CASE WHEN status=${task_status_1.TaskStatuses.onGoing} THEN 1 ELSE NULL END) as onGoing,
        COUNT(CASE WHEN status=${task_status_1.TaskStatuses.completed} THEN 1 ELSE NULL END) as completed

    from (
        SELECT
            t.id,
            t.status
        FROM
            visits v
        LEFT JOIN tasks t ON
            t.id = v.taskId
        WHERE
            v.userId = ${authUser.id} AND v.workspaceId = ${authUser.selectedWorkspace.workspaceId} AND MONTH(v.updatedAt) = ${month} AND YEAR(v.updatedAt) = ${year}
        GROUP BY
            v.taskId
    ) tasks
    `);
        const [{ pending }] = await this.dataSource.query(`
    SELECT
        COUNT(CASE WHEN status=${task_status_1.TaskStatuses.pending} THEN 1 ELSE NULL END) as pending
    FROM
        task_members tm
    LEFT JOIN tasks t ON
        t.id = tm.taskId
    WHERE
        tm.userId = ${authUser.id} AND t.workspaceId = ${authUser.selectedWorkspace.workspaceId} AND MONTH(t.startDate)=${month} AND  YEAR(t.startDate)=${year}
    `);
        return { visit, taskStatus: { ...taskStatus, pending } };
    }
    async myReportsTasks(authUser, month, year, status) {
        const getPendingList = async () => {
            return await this.dataSource.query(`
        SELECT
            t.id,
            t.status,
            t.name,
            t.description,
            t.lat,
            t.lng,
            t.address,
            t.startTime,
            t.totalVisitDuration
        FROM
            task_members tm
        LEFT JOIN tasks t ON
            t.id = tm.taskId
        WHERE
            tm.userId = ${authUser.id} 
            AND t.workspaceId = ${authUser.selectedWorkspace.workspaceId} 
            AND t.status = ${task_status_1.TaskStatuses.pending} 
            AND MONTH(t.startDate) = ${month} 
            AND YEAR(t.startDate) = ${year}
        ORDER BY t.id DESC
      `);
        };
        const getOnGoingOrCompletedOrBothList = async (onGoingOrCompleted) => {
            return await this.dataSource.query(`
        SELECT
            t.id,
            t.status,
            t.name,
            t.description,
            t.lat,
            t.lng,
            t.address,
            t.startTime,
            t.totalVisitDuration
        FROM
            visits v
        LEFT JOIN tasks t ON
            t.id = v.taskId
        WHERE
            v.userId = ${authUser.id} 
            AND v.workspaceId = ${authUser.selectedWorkspace.workspaceId} 
            ${onGoingOrCompleted ? `AND t.status = ${onGoingOrCompleted}` : ''} 
            AND MONTH(v.updatedAt) = ${month} 
            AND YEAR(v.updatedAt) = ${year}
        GROUP BY
            v.taskId
        ORDER BY v.id DESC
    `);
        };
        if (status == 0)
            return [...(await getPendingList()), ...(await getOnGoingOrCompletedOrBothList())];
        if (status == 1)
            return await getPendingList();
        if (status == 2)
            return await getOnGoingOrCompletedOrBothList(task_status_1.TaskStatuses.onGoing);
        if (status == 3)
            return await getOnGoingOrCompletedOrBothList(task_status_1.TaskStatuses.completed);
    }
    async employeeTeamReports(authUser, lastDays) {
        return await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .andWhere('v.teamId IS NOT NULL')
            .andWhere('DATE(v.createdAt) > (NOW() - INTERVAL :lastDays DAY)', { lastDays })
            .groupBy('v.teamId')
            .orderBy('t.name', 'ASC')
            .leftJoin('v.team', 't')
            .select([
            't.id AS teamId',
            't.name AS teamName',
            `COUNT(CASE WHEN v.currentStateId=1 OR v.currentStateId=3 THEN 1 ELSE NULL END) AS totalOnGoingVisits`,
            'COUNT(v.id) AS totalVisits',
            'SUM(v.duration) - SUM(v.totalPauseTime) AS totalWorkingTime',
            'COUNT(DISTINCT v.taskId) AS totalTasks',
        ])
            .getRawMany();
    }
    async employeeIndividualReports(authUser, lastDays) {
        return await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .andWhere('DATE(v.createdAt) > (NOW() - INTERVAL :lastDays DAY)', { lastDays })
            .groupBy('v.userId')
            .leftJoin('v.user', 'u')
            .leftJoin(db_1.WorkspaceUser, 'wu', 'wu.userId=u.id AND wu.workspaceId=:workspaceId', {
            workspaceId: authUser.selectedWorkspace.workspaceId,
        })
            .orderBy('u.name', 'ASC')
            .select([
            'u.id AS userId',
            'u.name AS userName',
            'u.image AS userImage',
            'wu.roleId AS roleId',
            `COUNT(CASE WHEN v.currentStateId=1 OR v.currentStateId=3 THEN 1 ELSE NULL END) AS totalOnGoingVisits`,
            'COUNT(v.id) AS totalVisits',
            'SUM(v.duration) - SUM(v.totalPauseTime) AS totalWorkingTime',
            'COUNT(DISTINCT v.taskId) AS totalTasks',
        ])
            .getRawMany();
    }
    async employeeTeamReportDetails(authUser, lastDays, teamId) {
        const visit = await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.workspaceId = :workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .andWhere('v.teamId = :teamId', { teamId })
            .andWhere('DATE(v.createdAt) > (NOW() - INTERVAL :lastDays DAY)', { lastDays })
            .select([
            `COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.in} THEN 1 ELSE NULL END) as started`,
            `COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.out} THEN 1 ELSE NULL END) as ended`,
            `COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.pause} THEN 1 ELSE NULL END) as paused`,
            `COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.resume} THEN 1 ELSE NULL END) as resumed`,
        ])
            .getRawOne();
        const [visitTaskCount] = await this.dataSource.query(`
      SELECT
      COUNT(CASE WHEN t.status=${task_status_1.TaskStatuses.onGoing} THEN 1 ELSE NULL END) as onGoing,
      COUNT(CASE WHEN t.status=${task_status_1.TaskStatuses.completed} THEN 1 ELSE NULL END) as completed
      FROM
          tasks t
      WHERE
          t.id IN(
          SELECT
              t.id
          FROM
              visits v
          LEFT JOIN tasks t ON
              t.id = v.taskId
          WHERE
              v.workspaceId = ${authUser.selectedWorkspace.workspaceId} AND v.teamId = ${teamId} 
              AND DATE(v.createdAt) > (NOW() - INTERVAL ${lastDays} DAY)
          GROUP BY
              t.id
      )
      `);
        const [taskMemberPendingTaskCount] = await this.dataSource.query(`
        SELECT
            COUNT(CASE WHEN t.status=${task_status_1.TaskStatuses.pending} THEN 1 ELSE NULL END) as pending
        FROM
            tasks t
        WHERE
            t.id IN(
            SELECT
                tm.taskId
            FROM
                task_members tm
            WHERE
                tm.teamId = ${teamId}
            GROUP BY
            tm.taskId
            )
            AND t.workspaceId=${authUser.selectedWorkspace.workspaceId} 
            AND DATE(t.startDate) > (CURDATE() - INTERVAL ${lastDays} DAY)
      `);
        return { task: { ...visitTaskCount, ...taskMemberPendingTaskCount }, visit };
    }
    async employeeIndividualReportDetails(authUser, lastDays, userId) {
        const visit = await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.workspaceId = :workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .andWhere('v.userId = :userId', { userId })
            .andWhere('DATE(v.createdAt) > (NOW() - INTERVAL :lastDays DAY)', { lastDays })
            .select([
            `COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.in} THEN 1 ELSE NULL END) as started`,
            `COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.out} THEN 1 ELSE NULL END) as ended`,
            `COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.pause} THEN 1 ELSE NULL END) as paused`,
            `COUNT(CASE WHEN v.currentStateId=${visit_states_1.VisitStates.resume} THEN 1 ELSE NULL END) as resumed`,
        ])
            .getRawOne();
        const [visitTaskCount] = await this.dataSource.query(`
      SELECT
      COUNT(CASE WHEN t.status=${task_status_1.TaskStatuses.onGoing} THEN 1 ELSE NULL END) as onGoing,
      COUNT(CASE WHEN t.status=${task_status_1.TaskStatuses.completed} THEN 1 ELSE NULL END) as completed
      FROM
          tasks t
      WHERE
          t.id IN(
          SELECT
              t.id
          FROM
              visits v
          LEFT JOIN tasks t ON
              t.id = v.taskId
          WHERE
              v.workspaceId = ${authUser.selectedWorkspace.workspaceId} AND v.userId = ${userId} 
              AND DATE(v.createdAt) > (NOW() - INTERVAL ${lastDays} DAY)
          GROUP BY
              t.id
      )
      `);
        const [taskMemberPendingTaskCount] = await this.dataSource.query(`
        SELECT
            COUNT(CASE WHEN t.status=${task_status_1.TaskStatuses.pending} THEN 1 ELSE NULL END) as pending
        FROM
            tasks t
        WHERE
            t.id IN(
            SELECT
                tm.taskId
            FROM
                task_members tm
            WHERE
                tm.userId = ${userId}
            GROUP BY
            tm.taskId
            )
            AND t.workspaceId=${authUser.selectedWorkspace.workspaceId} 
            AND DATE(t.startDate) > (CURDATE() - INTERVAL ${lastDays} DAY)
      `);
        return { task: { ...visitTaskCount, ...taskMemberPendingTaskCount }, visit };
    }
    async employeeTeamReportTasks(authUser, lastDays, teamId, status) {
        if (status == 0)
            return [
                ...(await this.getTaskMemberPendingTaskList(authUser.selectedWorkspace.workspaceId, lastDays, teamId, null)),
                ...(await this.getVisitTaskListForOnGoingOrCompletedOrBoth(authUser.selectedWorkspace.workspaceId, lastDays, teamId, null)),
            ];
        if (status == 1)
            return await this.getTaskMemberPendingTaskList(authUser.selectedWorkspace.workspaceId, lastDays, teamId, null);
        return await this.getVisitTaskListForOnGoingOrCompletedOrBoth(authUser.selectedWorkspace.workspaceId, lastDays, teamId, null, status);
    }
    async employeeIndividualReportTasks(authUser, lastDays, userId, status) {
        if (status == 0)
            return [
                ...(await this.getTaskMemberPendingTaskList(authUser.selectedWorkspace.workspaceId, lastDays, null, userId)),
                ...(await this.getVisitTaskListForOnGoingOrCompletedOrBoth(authUser.selectedWorkspace.workspaceId, lastDays, null, userId)),
            ];
        if (status == 1)
            return await this.getTaskMemberPendingTaskList(authUser.selectedWorkspace.workspaceId, lastDays, null, userId);
        return await this.getVisitTaskListForOnGoingOrCompletedOrBoth(authUser.selectedWorkspace.workspaceId, lastDays, null, userId, status);
    }
    async employeeTeamReportVisits(authUser, lastDays, teamId, states) {
        let stateCondition = `(v.currentStateId=${visit_states_1.VisitStates.in} OR v.currentStateId=${visit_states_1.VisitStates.resume})`;
        if (states == 0)
            stateCondition = `1=1`;
        if (states == 2)
            stateCondition = `v.currentStateId=${visit_states_1.VisitStates.pause}`;
        if (states == 4)
            stateCondition = `v.currentStateId=${visit_states_1.VisitStates.out}`;
        return await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .andWhere('v.teamId=:teamId', { teamId })
            .andWhere(`${stateCondition}`)
            .andWhere('DATE(v.createdAt) > (NOW() - INTERVAL :lastDays DAY)', { lastDays })
            .leftJoin('v.states', 's')
            .leftJoin('v.task', 't')
            .orderBy('v.id', 'DESC')
            .orderBy('s.id', 'DESC')
            .select([
            'v.id',
            'v.currentStateId',
            'v.createdAt',
            'v.duration',
            'v.totalPauseTime',
            's.id',
            's.stateId',
            's.lat',
            's.lng',
            's.address',
            's.duration',
            's.comment',
            't.id',
            't.name',
            't.lat',
            't.lng',
            't.address',
        ])
            .getMany();
    }
    async employeeIndividualReportVisits(authUser, lastDays, userId, states) {
        let stateCondition = `(v.currentStateId=${visit_states_1.VisitStates.in} OR v.currentStateId=${visit_states_1.VisitStates.resume})`;
        if (states == 0)
            stateCondition = `1=1`;
        if (states == 2)
            stateCondition = `v.currentStateId=${visit_states_1.VisitStates.pause}`;
        if (states == 4)
            stateCondition = `v.currentStateId=${visit_states_1.VisitStates.out}`;
        return await this.dataSource
            .createQueryBuilder(db_1.Visit, 'v')
            .where('v.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .andWhere('v.userId=:userId', { userId })
            .andWhere(`${stateCondition}`)
            .andWhere('DATE(v.createdAt) > (NOW() - INTERVAL :lastDays DAY)', { lastDays })
            .leftJoin('v.states', 's')
            .leftJoin('v.task', 't')
            .orderBy('v.id', 'DESC')
            .orderBy('s.id', 'DESC')
            .select([
            'v.id',
            'v.currentStateId',
            'v.createdAt',
            'v.duration',
            'v.totalPauseTime',
            's.id',
            's.stateId',
            's.lat',
            's.lng',
            's.address',
            's.duration',
            's.comment',
            't.id',
            't.name',
            't.lat',
            't.lng',
            't.address',
        ])
            .getMany();
    }
    async reportSummary(authUser, date, month, year) {
        const [summary] = await this.dataSource.query(`
    SELECT
        COUNT(*) AS visit,
        COUNT(DISTINCT v.taskId) AS task,
        SUM(v.duration) - SUM(v.totalPauseTime) AS totalWorkingTime
    FROM
        visits v
    WHERE
        v.workspaceId = ${authUser.selectedWorkspace.workspaceId}
        ${authUser.selectedWorkspace.roleId == 3 ? `AND v.userId = ${authUser.id}` : ''}
        AND YEAR(v.createdAt) = ${year}
        AND MONTH(v.createdAt) = ${month}
        ${date ? `AND DAY(v.createdAt) = ${date}` : ''}
    `);
        const dateWiseData = await this.dataSource.query(`
    SELECT
        DATE_FORMAT(v.createdAt, '%d %M, %Y') AS date,
        DAYNAME(v.createdAt) AS day,
        COUNT(*) AS visit,
        COUNT(DISTINCT v.taskId) AS task,
        SUM(v.duration) - SUM(v.totalPauseTime) AS totalWorkingTime
    FROM
        visits v
    WHERE
        v.workspaceId = ${authUser.selectedWorkspace.workspaceId}
        ${authUser.selectedWorkspace.roleId == 3 ? `AND v.userId = ${authUser.id}` : ''}
        AND YEAR(v.createdAt) = ${year}
        AND MONTH(v.createdAt) = ${month}
        ${date ? `AND DAY(v.createdAt) = ${date}` : ''}
    GROUP BY
        DAY(v.createdAt)
    ORDER BY
        DAY(v.createdAt) ASC
    `);
        return { summary, dateWiseData };
    }
    async attendanceReportDaily(authUser, date, month, year) {
        const [summary] = await this.dataSource.query(`
    SELECT
        (
        SELECT
            COUNT(wu.userId)
        FROM
            workspace_users wu
        WHERE
            wu.workspaceId = ${authUser.selectedWorkspace.workspaceId}
    ) AS total,
    COUNT(DISTINCT a.userId) AS present
    FROM
        attendances a
    WHERE
        a.userId IN(
        SELECT
            wu.userId
        FROM
            workspace_users wu
        WHERE
            wu.workspaceId = ${authUser.selectedWorkspace.workspaceId}
    ) AND DAY(a.createdAt) = ${date} AND MONTH(a.createdAt) = ${month} AND YEAR(a.createdAt) = ${year}
    `);
        const data = await this.dataSource.query(`
    SELECT
        u.id AS uId,
        u.name,
        u.image,
        u.loginId,
        a.id AS aId,
        a.startLat,
        a.startLng,
        a.startAddress,
        a.endLat,
        a.endLng,
        a.endAddress,
        a.duration,
        a.createdAt,
        a.endedAt
    FROM
        attendances a
    LEFT JOIN users u ON
        u.id = a.userId
    WHERE
        a.userId IN(
        SELECT
            wu.userId
        FROM
            workspace_users wu
        WHERE
            wu.workspaceId = ${authUser.selectedWorkspace.workspaceId}
    ) AND DAY(a.createdAt) = ${date} AND MONTH(a.createdAt) = ${month} AND YEAR(a.createdAt) = ${year}
    ORDER BY a.id DESC
    `);
        return { summary, data };
    }
    async attendanceReportMonthlyYearly(authUser, month, year) {
        const [summary] = await this.dataSource.query(`
    SELECT
        (
        SELECT
            COUNT(wu.userId)
        FROM
            workspace_users wu
        WHERE
            wu.workspaceId = ${authUser.selectedWorkspace.workspaceId}
    ) AS total,
    IFNULL(SUM(a.duration), 0) AS totalDuration
    FROM
        attendances a
    WHERE
        a.userId IN(
        SELECT
            wu.userId
        FROM
            workspace_users wu
        WHERE
            wu.workspaceId = ${authUser.selectedWorkspace.workspaceId}
    ) ${month ? `AND MONTH(a.createdAt) = ${month}` : ''} AND YEAR(a.createdAt) = ${year}
    `);
        const data = await this.dataSource.query(`
    SELECT
        u.id,
        u.name,
        u.image,
        u.loginId,
        COUNT(DISTINCT DATE(a.createdAt)) AS present,
        ${month
            ? `((SELECT RIGHT( LAST_DAY("${year}-${month}-01" ) , 2 )) - COUNT(DISTINCT DATE(a.createdAt))) as absent`
            : `((SELECT DAYOFYEAR("${year}-12-31")) - COUNT(DISTINCT DATE(a.createdAt))) as absent`}
    FROM
        attendances a
    LEFT JOIN users u ON u.id=a.userId
    WHERE
        a.userId IN(
        SELECT
            wu.userId
        FROM
            workspace_users wu
        WHERE
            wu.workspaceId = ${authUser.selectedWorkspace.workspaceId}
    ) ${month ? `AND MONTH(a.createdAt) = ${month}` : ''} AND YEAR(a.createdAt) = ${year}
    GROUP BY
        a.userId
    ORDER BY
        a.id DESC
    `);
        return { summary, data };
    }
    async getVisitTaskListForOnGoingOrCompletedOrBoth(workspaceId, lastDays, teamId, userId, status) {
        return await this.dataSource.query(`
    SELECT
        t.id,
        t.name,
        t.description,
        t.status,
        t.lat,
        t.lng,
        t.address,
        t.startTime,
        t.totalVisitDuration
    FROM
        tasks t
    WHERE
        t.id IN(
        SELECT
            t.id
        FROM
            visits v
        LEFT JOIN tasks t ON
            t.id = v.taskId
        WHERE
            v.workspaceId = ${workspaceId} 
            AND ${teamId ? `v.teamId = ${teamId}` : `v.userId = ${userId}`} 
            AND DATE(v.createdAt) >(NOW() - INTERVAL ${lastDays} DAY)
        GROUP BY
            t.id ORDER BY v.id DESC) 
            ${status ? `AND t.status = ${status}` : ''}
    `);
    }
    async getTaskMemberPendingTaskList(workspaceId, lastDays, teamId, userId) {
        return await this.dataSource.query(`
        SELECT
            t.id,
            t.name,
            t.description,
            t.status,
            t.lat,
            t.lng,
            t.address,
            t.startTime,
            t.totalVisitDuration
        FROM
            tasks t
        WHERE
            t.id IN(
            SELECT
                tm.taskId
            FROM
                task_members tm
            WHERE
                ${teamId ? `tm.teamId = ${teamId}` : `tm.userId = ${userId}`}
            GROUP BY
            tm.taskId
            )
            AND t.workspaceId=${workspaceId} 
            AND DATE(t.startDate) > (CURDATE() - INTERVAL ${lastDays} DAY)
            AND t.status=${task_status_1.TaskStatuses.pending}
            ORDER BY t.updatedAt DESC
      `);
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ReportService);
//# sourceMappingURL=report.service.js.map