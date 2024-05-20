import { TaskStatuses } from 'src/static/task-status';
import { VisitStates } from 'src/static/visit-states';
import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    myReports(req: any, month: number, year: number): Promise<{
        visit: any;
        taskStatus: any;
    }>;
    myReportsTasks(req: any, month: number, year: number, status: TaskStatuses | 0): Promise<any>;
    employeeTeamReports(req: any, lastDays: number): Promise<any[]>;
    employeeIndividualReports(req: any, lastDays: number): Promise<any[]>;
    employeeTeamReportDetails(req: any, lastDays: number, teamId: number): Promise<{
        task: any;
        visit: any;
    }>;
    employeeIndividualReportDetails(req: any, lastDays: number, userId: number): Promise<{
        task: any;
        visit: any;
    }>;
    employeeTeamReportTasks(req: any, teamId: number, lastDays: number, status: TaskStatuses | 0): Promise<any>;
    employeeIndividualReportTasks(req: any, userId: number, lastDays: number, status: TaskStatuses | 0): Promise<any>;
    employeeTeamReportVisits(req: any, teamId: number, lastDays: number, states: VisitStates | 0): Promise<import("../db").Visit[]>;
    employeeIndividualReportVisits(req: any, userId: number, lastDays: number, states: VisitStates | 0): Promise<import("../db").Visit[]>;
    reportSummaryDaily(req: any, date: number | null, month: number, year: number): Promise<{
        summary: any;
        dateWiseData: any;
    }>;
    reportSummaryMonthly(req: any, month: number, year: number): Promise<{
        summary: any;
        dateWiseData: any;
    }>;
    attendanceReportDaily(req: any, date: number | null, month: number, year: number): Promise<{
        summary: any;
        data: any;
    }>;
    attendanceReportMonthly(req: any, month: number, year: number): Promise<{
        summary: any;
        data: any;
    }>;
    attendanceReportYearly(req: any, year: number): Promise<{
        summary: any;
        data: any;
    }>;
}
