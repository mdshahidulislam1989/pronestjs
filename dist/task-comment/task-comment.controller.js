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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCommentController = void 0;
const common_1 = require("@nestjs/common");
const save_dto_1 = require("./dto/save.dto");
const task_comment_service_1 = require("./task-comment.service");
let TaskCommentController = class TaskCommentController {
    constructor(taskCommentService) {
        this.taskCommentService = taskCommentService;
    }
    async add(req, taskId, saveDto) {
        return await this.taskCommentService.add(req?.user, taskId, saveDto);
    }
    async getAllByTaskId(taskId) {
        return await this.taskCommentService.getAllByTaskId(taskId);
    }
};
exports.TaskCommentController = TaskCommentController;
__decorate([
    (0, common_1.Post)('add/:taskId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, save_dto_1.SaveDto]),
    __metadata("design:returntype", Promise)
], TaskCommentController.prototype, "add", null);
__decorate([
    (0, common_1.Get)('get-all/task/:taskId'),
    __param(0, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskCommentController.prototype, "getAllByTaskId", null);
exports.TaskCommentController = TaskCommentController = __decorate([
    (0, common_1.Controller)('task-comment'),
    __metadata("design:paramtypes", [task_comment_service_1.TaskCommentService])
], TaskCommentController);
//# sourceMappingURL=task-comment.controller.js.map