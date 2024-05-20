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
exports.MyPanelController = void 0;
const common_1 = require("@nestjs/common");
const my_panel_service_1 = require("./my-panel.service");
let MyPanelController = class MyPanelController {
    constructor(myPanelService) {
        this.myPanelService = myPanelService;
    }
    async getVisitsBy(req, all, startedOrResumed, paused, ended) {
        return await this.myPanelService.getVisitsBy(req?.user, all, startedOrResumed, paused, ended);
    }
    async allTasksStatusCount(req) {
        return await this.myPanelService.allTasksStatusCount(req?.user);
    }
    async allVisitsStatusCount(req) {
        return await this.myPanelService.allVisitsStatusCount(req?.user);
    }
    async lastTeamTasksByLimit(req, limit) {
        return await this.myPanelService.lastTeamTasksByLimit(req?.user, limit);
    }
    async recentTasks(req, status, isToday) {
        return await this.myPanelService.recentTasks(req?.user, status, isToday);
    }
};
exports.MyPanelController = MyPanelController;
__decorate([
    (0, common_1.Get)('get-visits-by'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('all', common_1.ParseBoolPipe)),
    __param(2, (0, common_1.Query)('started-or-resumed', common_1.ParseBoolPipe)),
    __param(3, (0, common_1.Query)('paused', common_1.ParseBoolPipe)),
    __param(4, (0, common_1.Query)('ended', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean, Boolean, Boolean, Boolean]),
    __metadata("design:returntype", Promise)
], MyPanelController.prototype, "getVisitsBy", null);
__decorate([
    (0, common_1.Get)('all-tasks-status-count'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyPanelController.prototype, "allTasksStatusCount", null);
__decorate([
    (0, common_1.Get)('all-visits-status-count'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyPanelController.prototype, "allVisitsStatusCount", null);
__decorate([
    (0, common_1.Get)('last-team-tasks'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], MyPanelController.prototype, "lastTeamTasksByLimit", null);
__decorate([
    (0, common_1.Get)('recent-tasks'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status', new common_1.DefaultValuePipe(0))),
    __param(2, (0, common_1.Query)('isToday', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Boolean]),
    __metadata("design:returntype", Promise)
], MyPanelController.prototype, "recentTasks", null);
exports.MyPanelController = MyPanelController = __decorate([
    (0, common_1.Controller)('my-panel'),
    __metadata("design:paramtypes", [my_panel_service_1.MyPanelService])
], MyPanelController);
//# sourceMappingURL=my-panel.controller.js.map