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
exports.Task = void 0;
const task_status_1 = require("../static/task-status");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const org_task_category_entity_1 = require("./org-task-category.entity");
const org_task_type_entity_1 = require("./org-task-type.entity");
const organization_entity_1 = require("./organization.entity");
const task_attachment_entity_1 = require("./task-attachment.entity");
const task_comment_entity_1 = require("./task-comment.entity");
const task_member_entity_1 = require("./task-member.entity");
const user_entity_1 = require("./user.entity");
const visit_entity_1 = require("./visit.entity");
const workspace_entity_1 = require("./workspace.entity");
let Task = class Task extends base_entity_1.BaseEntity {
};
exports.Task = Task;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'longtext' }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Task.prototype, "isMultipleVisit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Task.prototype, "expectedVisitNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "contactName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "contactCountryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "contactNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "contactAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: task_status_1.TaskStatuses, default: task_status_1.TaskStatuses.pending }),
    __metadata("design:type", Number)
], Task.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "totalVisit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "totalVisitDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Boolean)
], Task.prototype, "isInstantVisit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => org_task_category_entity_1.OrgTaskCategory, orgTaskCategory => orgTaskCategory.tasks),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", org_task_category_entity_1.OrgTaskCategory)
], Task.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => org_task_type_entity_1.OrgTaskType, orgTaskType => orgTaskType.tasks),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", org_task_type_entity_1.OrgTaskType)
], Task.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.createdTasks),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Task.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.updatedTasks),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Task.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workspace_entity_1.Workspace, workspace => workspace.tasks, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", workspace_entity_1.Workspace)
], Task.prototype, "workspace", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, organization => organization.tasks),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", organization_entity_1.Organization)
], Task.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_attachment_entity_1.TaskAttachment, taskAttachment => taskAttachment.task),
    __metadata("design:type", Array)
], Task.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_member_entity_1.TaskMember, taskMember => taskMember.task),
    __metadata("design:type", Array)
], Task.prototype, "taskMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_comment_entity_1.TaskComment, taskComment => taskComment.task),
    __metadata("design:type", Array)
], Task.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visit_entity_1.Visit, visit => visit.task),
    __metadata("design:type", Array)
], Task.prototype, "visits", void 0);
exports.Task = Task = __decorate([
    (0, typeorm_1.Entity)({ name: 'tasks' })
], Task);
//# sourceMappingURL=task.entity.js.map