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
exports.OrgTaskTypeController = void 0;
const common_1 = require("@nestjs/common");
const save_dto_1 = require("./dto/save.dto");
const org_task_type_service_1 = require("./org-task-type.service");
let OrgTaskTypeController = class OrgTaskTypeController {
    constructor(orgTaskTypeService) {
        this.orgTaskTypeService = orgTaskTypeService;
    }
    async getSelectedWorkspaceOrgTaskTypes(req) {
        return await this.orgTaskTypeService.getSelectedWorkspaceOrgTaskTypes(req?.user);
    }
    async createInSelectedOrg(req, saveDto) {
        return await this.orgTaskTypeService.createInSelectedOrg(req?.user, saveDto);
    }
    async updateInSelectedOrg(req, id, saveDto) {
        return await this.orgTaskTypeService.updateInSelectedOrg(req?.user, id, saveDto);
    }
    async delete(id) {
        return await this.orgTaskTypeService.delete(id);
    }
};
exports.OrgTaskTypeController = OrgTaskTypeController;
__decorate([
    (0, common_1.Get)('get-selected-workspace-org-task-types'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrgTaskTypeController.prototype, "getSelectedWorkspaceOrgTaskTypes", null);
__decorate([
    (0, common_1.Post)('create-in-selected-org'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, save_dto_1.SaveDto]),
    __metadata("design:returntype", Promise)
], OrgTaskTypeController.prototype, "createInSelectedOrg", null);
__decorate([
    (0, common_1.Put)(':id/update-in-selected-org'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, save_dto_1.SaveDto]),
    __metadata("design:returntype", Promise)
], OrgTaskTypeController.prototype, "updateInSelectedOrg", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrgTaskTypeController.prototype, "delete", null);
exports.OrgTaskTypeController = OrgTaskTypeController = __decorate([
    (0, common_1.Controller)('org-task-type'),
    __metadata("design:paramtypes", [org_task_type_service_1.OrgTaskTypeService])
], OrgTaskTypeController);
//# sourceMappingURL=org-task-type.controller.js.map