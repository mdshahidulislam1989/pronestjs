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
exports.VisitController = void 0;
const common_1 = require("@nestjs/common");
const instant_visit_dto_1 = require("./dto/instant-visit.dto");
const save_dto_1 = require("./dto/save.dto");
const visit_service_1 = require("./visit.service");
let VisitController = class VisitController {
    constructor(visitService) {
        this.visitService = visitService;
    }
    async taskMyLastVisitCurrentState(req, taskId) {
        return await this.visitService.taskMyLastVisitCurrentState(req?.user, taskId);
    }
    async instantVisit(req, instantVisitDto) {
        return await this.visitService.instantVisit(req?.user, instantVisitDto);
    }
    async visitIn(req, taskId, saveDto) {
        return await this.visitService.visitIn(req?.user, taskId, saveDto);
    }
    async visitPause(req, visitId, taskId, saveDto) {
        return await this.visitService.visitPause(req?.user, visitId, taskId, saveDto);
    }
    async visitResume(req, visitId, taskId, saveDto) {
        return await this.visitService.visitResume(req?.user, visitId, taskId, saveDto);
    }
    async visitOut(req, visitId, taskId, saveDto) {
        return await this.visitService.visitOut(req?.user, visitId, taskId, saveDto);
    }
    async taskVisits(taskId, stateId) {
        return await this.visitService.taskVisits(taskId, stateId);
    }
};
exports.VisitController = VisitController;
__decorate([
    (0, common_1.Get)('task-my-last-visit-current-state/:taskId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "taskMyLastVisitCurrentState", null);
__decorate([
    (0, common_1.Post)('instant-visit'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, instant_visit_dto_1.InstantVisitDto]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "instantVisit", null);
__decorate([
    (0, common_1.Post)('visit-in/task/:taskId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, save_dto_1.SaveDto]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "visitIn", null);
__decorate([
    (0, common_1.Post)(':visitId/visit-pause/task/:taskId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('visitId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, save_dto_1.SaveDto]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "visitPause", null);
__decorate([
    (0, common_1.Post)(':visitId/visit-resume/task/:taskId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('visitId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, save_dto_1.SaveDto]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "visitResume", null);
__decorate([
    (0, common_1.Post)(':visitId/visit-out/task/:taskId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('visitId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, save_dto_1.SaveDto]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "visitOut", null);
__decorate([
    (0, common_1.Get)('task-visits/task/:taskId'),
    __param(0, (0, common_1.Param)('taskId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('stateId', new common_1.DefaultValuePipe(0))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "taskVisits", null);
exports.VisitController = VisitController = __decorate([
    (0, common_1.Controller)('visit'),
    __metadata("design:paramtypes", [visit_service_1.VisitService])
], VisitController);
//# sourceMappingURL=visit.controller.js.map