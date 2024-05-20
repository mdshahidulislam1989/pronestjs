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
exports.Workspace = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const notification_entity_1 = require("./notification.entity");
const organization_entity_1 = require("./organization.entity");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("./user.entity");
const visit_entity_1 = require("./visit.entity");
const workspace_user_entity_1 = require("./workspace-user.entity");
let Workspace = class Workspace extends base_entity_1.BaseEntity {
};
exports.Workspace = Workspace;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Workspace.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workspace.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Workspace.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Workspace.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, organization => organization.workspaces),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'FK_organization_id' }),
    __metadata("design:type", organization_entity_1.Organization)
], Workspace.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workspace_user_entity_1.WorkspaceUser, workspaceUser => workspaceUser.workspace),
    __metadata("design:type", Array)
], Workspace.prototype, "workspaceUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, task => task.workspace),
    __metadata("design:type", Array)
], Workspace.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visit_entity_1.Visit, visit => visit.workspace),
    __metadata("design:type", Array)
], Workspace.prototype, "visits", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, notification => notification.workspace),
    __metadata("design:type", Array)
], Workspace.prototype, "notifications", void 0);
exports.Workspace = Workspace = __decorate([
    (0, typeorm_1.Entity)({ name: 'workspaces' })
], Workspace);
//# sourceMappingURL=workspace.entity.js.map