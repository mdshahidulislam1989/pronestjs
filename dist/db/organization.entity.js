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
exports.Organization = void 0;
const typeorm_1 = require("typeorm");
const attendance_entity_1 = require("./attendance.entity");
const base_entity_1 = require("./base.entity");
const notification_entity_1 = require("./notification.entity");
const org_task_category_entity_1 = require("./org-task-category.entity");
const org_task_type_entity_1 = require("./org-task-type.entity");
const org_team_entity_1 = require("./org-team.entity");
const organization_user_entity_1 = require("./organization-user.entity");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("./user.entity");
const visit_entity_1 = require("./visit.entity");
const workspace_entity_1 = require("./workspace.entity");
let Organization = class Organization extends base_entity_1.BaseEntity {
};
exports.Organization = Organization;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Organization.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "timeZone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Organization.prototype, "teamSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "packageName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Organization.prototype, "userLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "purchaseToken", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.createdOrganization),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Organization.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organization_user_entity_1.OrganizationUser, organizationUser => organizationUser.organization),
    __metadata("design:type", Array)
], Organization.prototype, "organizationUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workspace_entity_1.Workspace, workspace => workspace.organization),
    __metadata("design:type", Array)
], Organization.prototype, "workspaces", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_task_type_entity_1.OrgTaskType, orgTaskType => orgTaskType.organization),
    __metadata("design:type", Array)
], Organization.prototype, "taskTypes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_task_category_entity_1.OrgTaskCategory, orgTaskCategory => orgTaskCategory.organization),
    __metadata("design:type", Array)
], Organization.prototype, "taskCategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, task => task.organization),
    __metadata("design:type", Array)
], Organization.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_team_entity_1.OrgTeam, orgTeam => orgTeam.organization),
    __metadata("design:type", Array)
], Organization.prototype, "teams", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visit_entity_1.Visit, visit => visit.organization),
    __metadata("design:type", Array)
], Organization.prototype, "visits", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, attendance => attendance.organization),
    __metadata("design:type", Array)
], Organization.prototype, "attendances", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, notification => notification.organization),
    __metadata("design:type", Array)
], Organization.prototype, "notifications", void 0);
exports.Organization = Organization = __decorate([
    (0, typeorm_1.Entity)({ name: 'organizations' })
], Organization);
//# sourceMappingURL=organization.entity.js.map