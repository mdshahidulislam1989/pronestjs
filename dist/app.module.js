"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("././config");
const auth_module_1 = require("./auth/auth.module");
const organization_module_1 = require("./organization/organization.module");
const mail_module_1 = require("./mail/mail.module");
const workspace_module_1 = require("./workspace/workspace.module");
const org_task_type_module_1 = require("./org-task-type/org-task-type.module");
const org_task_category_module_1 = require("./org-task-category/org-task-category.module");
const org_team_module_1 = require("./org-team/org-team.module");
const task_module_1 = require("./task/task.module");
const task_comment_module_1 = require("./task-comment/task-comment.module");
const visit_module_1 = require("./visit/visit.module");
const attendance_module_1 = require("./attendance/attendance.module");
const my_panel_module_1 = require("./my-panel/my-panel.module");
const report_module_1 = require("./report/report.module");
const notification_module_1 = require("./notification/notification.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.GlobalConfig.db, auth_module_1.AuthModule, organization_module_1.OrganizationModule, mail_module_1.MailModule, workspace_module_1.WorkspaceModule, org_task_type_module_1.OrgTaskTypeModule, org_task_category_module_1.OrgTaskCategoryModule, org_team_module_1.OrgTeamModule, task_module_1.TaskModule, task_comment_module_1.TaskCommentModule, visit_module_1.VisitModule, attendance_module_1.AttendanceModule, my_panel_module_1.MyPanelModule, report_module_1.ReportModule, notification_module_1.NotificationModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map