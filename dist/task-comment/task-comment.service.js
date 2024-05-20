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
exports.TaskCommentService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const responses_1 = require("../utils/responses");
const typeorm_1 = require("typeorm");
let TaskCommentService = class TaskCommentService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async add(authUser, taskId, saveDto) {
        await this.dataSource.query(`
    INSERT INTO task_comments(
        comment,
        taskId,
        createdById
    )
    VALUES("${saveDto.comment}",${taskId},${authUser.id})
    `);
        return (0, responses_1.SuccessResponse)('Comment posted!');
    }
    async getAllByTaskId(taskId) {
        return await this.dataSource
            .createQueryBuilder(db_1.TaskComment, 'tc')
            .orderBy('tc.id', 'DESC')
            .leftJoin('tc.createdBy', 'cb')
            .select(['tc.id', 'tc.comment', 'tc.createdAt', 'tc.updatedAt'])
            .addSelect(['cb.id', 'cb.name', 'cb.image'])
            .where('tc.taskId=:taskId', { taskId })
            .getMany();
    }
};
exports.TaskCommentService = TaskCommentService;
exports.TaskCommentService = TaskCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TaskCommentService);
//# sourceMappingURL=task-comment.service.js.map