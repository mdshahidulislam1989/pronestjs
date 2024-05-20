import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { Visit } from 'src/db';
import { TaskStatuses } from 'src/static/task-status';
import { VisitStates } from 'src/static/visit-states';
import { DataSource } from 'typeorm';
export declare class ReportService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    myReports(authUser: IJwtAuthToken, month: number, year: number): Promise<{
        visit: any;
        taskStatus: any;
    }>;
    myReportsTasks(authUser: IJwtAuthToken, month: number, year: number, status: TaskStatuses | 0): Promise<any>;
    employeeTeamReports(authUser: IJwtAuthToken, lastDays: number): Promise<any[]>;
    employeeIndividualReports(authUser: IJwtAuthToken, lastDays: number): Promise<any[]>;
    employeeTeamReportDetails(authUser: IJwtAuthToken, lastDays: number, teamId: number): Promise<{
        task: any;
        visit: any;
    }>;
    employeeIndividualReportDetails(authUser: IJwtAuthToken, lastDays: number, userId: number): Promise<{
        task: any;
        visit: any;
    }>;
    employeeTeamReportTasks(authUser: IJwtAuthToken, lastDays: number, teamId: number, status: TaskStatuses | 0): Promise<any>;
    employeeIndividualReportTasks(authUser: IJwtAuthToken, lastDays: number, userId: number, status: TaskStatuses | 0): Promise<any>;
    employeeTeamReportVisits(authUser: IJwtAuthToken, lastDays: number, teamId: number, states: VisitStates | 0): Promise<Visit[]>;
    employeeIndividualReportVisits(authUser: IJwtAuthToken, lastDays: number, userId: number, states: VisitStates | 0): Promise<Visit[]>;
    reportSummary(authUser: IJwtAuthToken, date: number | null, month: number, year: number): Promise<{
        summary: any;
        dateWiseData: any;
    }>;
    attendanceReportDaily(authUser: IJwtAuthToken, date: number, month: number, year: number): Promise<{
        summary: any;
        data: any;
    }>;
    attendanceReportMonthlyYearly(authUser: IJwtAuthToken, month: number | null, year: number): Promise<{
        summary: any;
        data: any;
    }>;
    getVisitTaskListForOnGoingOrCompletedOrBoth(workspaceId: number, lastDays: number, teamId?: number, userId?: number, status?: TaskStatuses | 0): Promise<any>;
    getTaskMemberPendingTaskList(workspaceId: number, lastDays: number, teamId?: number, userId?: number): Promise<any>;
}
