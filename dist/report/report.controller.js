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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async myReports(req, month, year) {
        return await this.reportService.myReports(req?.user, month, year);
    }
    async myReportsTasks(req, month, year, status) {
        return await this.reportService.myReportsTasks(req?.user, month, year, status);
    }
    async employeeTeamReports(req, lastDays) {
        return await this.reportService.employeeTeamReports(req?.user, lastDays);
    }
    async employeeIndividualReports(req, lastDays) {
        return await this.reportService.employeeIndividualReports(req?.user, lastDays);
    }
    async employeeTeamReportDetails(req, lastDays, teamId) {
        return await this.reportService.employeeTeamReportDetails(req?.user, lastDays, teamId);
    }
    async employeeIndividualReportDetails(req, lastDays, userId) {
        return await this.reportService.employeeIndividualReportDetails(req?.user, lastDays, userId);
    }
    async employeeTeamReportTasks(req, teamId, lastDays, status) {
        return await this.reportService.employeeTeamReportTasks(req?.user, lastDays, teamId, status);
    }
    async employeeIndividualReportTasks(req, userId, lastDays, status) {
        return await this.reportService.employeeIndividualReportTasks(req?.user, lastDays, userId, status);
    }
    async employeeTeamReportVisits(req, teamId, lastDays, states) {
        return await this.reportService.employeeTeamReportVisits(req?.user, lastDays, teamId, states);
    }
    async employeeIndividualReportVisits(req, userId, lastDays, states) {
        return await this.reportService.employeeIndividualReportVisits(req?.user, lastDays, userId, states);
    }
    async reportSummaryDaily(req, date, month, year) {
        return await this.reportService.reportSummary(req?.user, date, month, year);
    }
    async reportSummaryMonthly(req, month, year) {
        return await this.reportService.reportSummary(req?.user, null, month, year);
    }
    async attendanceReportDaily(req, date, month, year) {
        return await this.reportService.attendanceReportDaily(req?.user, date, month, year);
    }
    async attendanceReportMonthly(req, month, year) {
        return await this.reportService.attendanceReportMonthlyYearly(req?.user, month, year);
    }
    async attendanceReportYearly(req, year) {
        return await this.reportService.attendanceReportMonthlyYearly(req?.user, null, year);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)('my-reports'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "myReports", null);
__decorate([
    (0, common_1.Get)('my-reports/tasks'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "myReportsTasks", null);
__decorate([
    (0, common_1.Get)('employee-reports/team'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('lastDays')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "employeeTeamReports", null);
__decorate([
    (0, common_1.Get)('employee-reports/individual'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('lastDays')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "employeeIndividualReports", null);
__decorate([
    (0, common_1.Get)('employee-report-details/team/:teamId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('lastDays')),
    __param(2, (0, common_1.Param)('teamId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "employeeTeamReportDetails", null);
__decorate([
    (0, common_1.Get)('employee-report-details/individual/:userId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('lastDays')),
    __param(2, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "employeeIndividualReportDetails", null);
__decorate([
    (0, common_1.Get)('employee-report-tasks/team/:teamId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('teamId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('lastDays')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "employeeTeamReportTasks", null);
__decorate([
    (0, common_1.Get)('employee-report-tasks/individual/:userId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('lastDays')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "employeeIndividualReportTasks", null);
__decorate([
    (0, common_1.Get)('employee-report-visits/team/:teamId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('teamId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('lastDays')),
    __param(3, (0, common_1.Query)('states')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "employeeTeamReportVisits", null);
__decorate([
    (0, common_1.Get)('employee-report-visits/individual/:userId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('lastDays')),
    __param(3, (0, common_1.Query)('states')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "employeeIndividualReportVisits", null);
__decorate([
    (0, common_1.Get)('report-summary/daily'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('month')),
    __param(3, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "reportSummaryDaily", null);
__decorate([
    (0, common_1.Get)('report-summary/monthly'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "reportSummaryMonthly", null);
__decorate([
    (0, common_1.Get)('attendance-report/daily'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('month')),
    __param(3, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "attendanceReportDaily", null);
__decorate([
    (0, common_1.Get)('attendance-report/monthly'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "attendanceReportMonthly", null);
__decorate([
    (0, common_1.Get)('attendance-report/yearly'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "attendanceReportYearly", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map