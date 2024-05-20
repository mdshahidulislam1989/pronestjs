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
exports.OrgTaskType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const organization_entity_1 = require("./organization.entity");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("./user.entity");
let OrgTaskType = class OrgTaskType extends base_entity_1.BaseEntity {
};
exports.OrgTaskType = OrgTaskType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], OrgTaskType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrgTaskType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.createdTaskTypes),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], OrgTaskType.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.updatedTaskTypes),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], OrgTaskType.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, organization => organization.taskTypes),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", organization_entity_1.Organization)
], OrgTaskType.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, task => task.type),
    __metadata("design:type", Array)
], OrgTaskType.prototype, "tasks", void 0);
exports.OrgTaskType = OrgTaskType = __decorate([
    (0, typeorm_1.Entity)({ name: 'org_task_types' })
], OrgTaskType);
//# sourceMappingURL=org-task-type.entity.js.map