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
exports.WorkspaceUser = void 0;
const user_roles_1 = require("../static/user-roles");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const index_1 = require("./index");
const workspace_entity_1 = require("./workspace.entity");
let WorkspaceUser = class WorkspaceUser extends base_entity_1.BaseEntity {
};
exports.WorkspaceUser = WorkspaceUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], WorkspaceUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: user_roles_1.UserRoles, default: user_roles_1.UserRoles.owner }),
    __metadata("design:type", Number)
], WorkspaceUser.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WorkspaceUser.prototype, "isSelected", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workspace_entity_1.Workspace, workspace => workspace.workspaceUsers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'FK_workspace_id' }),
    __metadata("design:type", workspace_entity_1.Workspace)
], WorkspaceUser.prototype, "workspace", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.User, user => user.workspaceUsers),
    (0, typeorm_1.JoinColumn)({ foreignKeyConstraintName: 'FK_user_id' }),
    __metadata("design:type", index_1.User)
], WorkspaceUser.prototype, "user", void 0);
exports.WorkspaceUser = WorkspaceUser = __decorate([
    (0, typeorm_1.Entity)({ name: 'workspace_users' })
], WorkspaceUser);
//# sourceMappingURL=workspace-user.entity.js.map