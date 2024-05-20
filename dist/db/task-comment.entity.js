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
exports.TaskComment = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("./user.entity");
let TaskComment = class TaskComment extends base_entity_1.BaseEntity {
};
exports.TaskComment = TaskComment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], TaskComment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'longtext' }),
    __metadata("design:type", String)
], TaskComment.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.Task, task => task.comments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", task_entity_1.Task)
], TaskComment.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.taskComments),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], TaskComment.prototype, "createdBy", void 0);
exports.TaskComment = TaskComment = __decorate([
    (0, typeorm_1.Entity)({ name: 'task_comments' })
], TaskComment);
//# sourceMappingURL=task-comment.entity.js.map