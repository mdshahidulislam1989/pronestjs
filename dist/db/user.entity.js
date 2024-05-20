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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const attendance_entity_1 = require("./attendance.entity");
const base_entity_1 = require("./base.entity");
const notification_settings_entity_1 = require("./notification-settings.entity");
const notification_entity_1 = require("./notification.entity");
const org_task_category_entity_1 = require("./org-task-category.entity");
const org_task_type_entity_1 = require("./org-task-type.entity");
const org_team_user_entity_1 = require("./org-team-user.entity");
const organization_user_entity_1 = require("./organization-user.entity");
const organization_entity_1 = require("./organization.entity");
const task_attachment_entity_1 = require("./task-attachment.entity");
const task_comment_entity_1 = require("./task-comment.entity");
const task_member_entity_1 = require("./task-member.entity");
const task_entity_1 = require("./task.entity");
const visit_attachment_entity_1 = require("./visit-attachment.entity");
const visit_entity_1 = require("./visit.entity");
const workspace_user_entity_1 = require("./workspace-user.entity");
let User = class User extends base_entity_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "loginId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "dialCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isSocialLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "profileUpdatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => organization_entity_1.Organization, organization => organization.createdBy),
    __metadata("design:type", organization_entity_1.Organization)
], User.prototype, "createdOrganization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organization_user_entity_1.OrganizationUser, organizationUser => organizationUser.user),
    __metadata("design:type", Array)
], User.prototype, "organizationUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workspace_user_entity_1.WorkspaceUser, workspaceUser => workspaceUser.user),
    __metadata("design:type", Array)
], User.prototype, "workspaceUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_task_type_entity_1.OrgTaskType, orgTaskType => orgTaskType.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdTaskTypes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_task_type_entity_1.OrgTaskType, orgTaskType => orgTaskType.updatedBy),
    __metadata("design:type", Array)
], User.prototype, "updatedTaskTypes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_task_category_entity_1.OrgTaskCategory, orgTaskCategory => orgTaskCategory.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdTaskCategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_task_category_entity_1.OrgTaskCategory, orgTaskCategory => orgTaskCategory.updatedBy),
    __metadata("design:type", Array)
], User.prototype, "updatedTaskCategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, task => task.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdTasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, task => task.updatedBy),
    __metadata("design:type", Array)
], User.prototype, "updatedTasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_attachment_entity_1.TaskAttachment, taskAttachment => taskAttachment.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdTaskAttachments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_team_user_entity_1.OrgTeamUser, orgTeamUser => orgTeamUser.user),
    __metadata("design:type", Array)
], User.prototype, "orgTeamUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_member_entity_1.TaskMember, taskMember => taskMember.user),
    __metadata("design:type", Array)
], User.prototype, "taskMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_member_entity_1.TaskMember, taskMember => taskMember.addedBy),
    __metadata("design:type", Array)
], User.prototype, "addedTaskMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_comment_entity_1.TaskComment, taskComment => taskComment.createdBy),
    __metadata("design:type", Array)
], User.prototype, "taskComments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visit_attachment_entity_1.VisitAttachment, visitAttachment => visitAttachment.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdVisitAttachments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visit_entity_1.Visit, visit => visit.user),
    __metadata("design:type", Array)
], User.prototype, "visits", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, attendance => attendance.user),
    __metadata("design:type", Array)
], User.prototype, "attendances", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => notification_settings_entity_1.NotificationSettings, notificationSettings => notificationSettings.user),
    __metadata("design:type", notification_settings_entity_1.NotificationSettings)
], User.prototype, "notificationSettings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, notification => notification.sender),
    __metadata("design:type", Array)
], User.prototype, "sendedNotifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, notification => notification.receiver),
    __metadata("design:type", Array)
], User.prototype, "receivedNotifications", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map