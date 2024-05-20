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
exports.TaskMember = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const index_1 = require("./index");
let TaskMember = class TaskMember extends base_entity_1.BaseEntity {
};
exports.TaskMember = TaskMember;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], TaskMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.User, user => user.taskMembers),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", index_1.User)
], TaskMember.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.Task, task => task.taskMembers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", index_1.Task)
], TaskMember.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.User, user => user.addedTaskMembers),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", index_1.User)
], TaskMember.prototype, "addedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.OrgTeam, orgTeam => orgTeam.assignedTasks),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", index_1.OrgTeam)
], TaskMember.prototype, "team", void 0);
exports.TaskMember = TaskMember = __decorate([
    (0, typeorm_1.Entity)({ name: 'task_members' })
], TaskMember);
//# sourceMappingURL=task-member.entity.js.map