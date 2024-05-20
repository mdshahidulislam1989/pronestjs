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
exports.WorkspaceController = void 0;
const common_1 = require("@nestjs/common");
const initial_workspace_create_dto_1 = require("./dto/initial-workspace-create.dto");
const update_members_dto_1 = require("./dto/update-members.dto");
const workspace_create_dto_1 = require("./dto/workspace-create.dto");
const workspace_name_update_dto_1 = require("./dto/workspace-name-update.dto");
const workspace_service_1 = require("./workspace.service");
let WorkspaceController = class WorkspaceController {
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
    }
    async setMyCurrentWorkspace(req, workspaceId) {
        return await this.workspaceService.setMyCurrentWorkspace(req.user, workspaceId);
    }
    async createInitialAndSelect(req, initialWorkspaceCreateDto) {
        return await this.workspaceService.createInitialAndSelect(req.user, initialWorkspaceCreateDto);
    }
    async orgNotPendingUsers(req) {
        return await this.workspaceService.orgNotPendingUsers(req.user);
    }
    async selectedWorkspaceUsers(req) {
        return await this.workspaceService.selectedWorkspaceUsers(req?.user);
    }
    async create(req, workspaceCreateDto) {
        return await this.workspaceService.create(req.user, workspaceCreateDto);
    }
    async updateMembers(req, id, updateMembersDto) {
        return await this.workspaceService.updateMembers(req?.user, id, updateMembersDto);
    }
    async updateWorkspaceName(req, id, workspaceNameUpdateDto) {
        return await this.workspaceService.updateWorkspaceName(req?.user, id, workspaceNameUpdateDto);
    }
    async myRelated(req) {
        return await this.workspaceService.myRelated(req.user);
    }
    async workspaceDetails(id) {
        return await this.workspaceService.workspaceDetails(id);
    }
    async assignNewMembersInSelectedWorkspace(req, updateMembersDto) {
        return await this.workspaceService.assignNewMembersInSelectedWorkspace(req?.user, updateMembersDto);
    }
    async delete(req, id) {
        return await this.workspaceService.delete(req?.user, id);
    }
};
exports.WorkspaceController = WorkspaceController;
__decorate([
    (0, common_1.Put)('set-my-current-workspace'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('workspaceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "setMyCurrentWorkspace", null);
__decorate([
    (0, common_1.Post)('create-initial-and-select'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, initial_workspace_create_dto_1.InitialWorkspaceCreateDto]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "createInitialAndSelect", null);
__decorate([
    (0, common_1.Get)('org-not-pending-users'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "orgNotPendingUsers", null);
__decorate([
    (0, common_1.Get)('selected-workspace-users'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "selectedWorkspaceUsers", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, workspace_create_dto_1.WorkspaceCreateDto]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/update-members'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_members_dto_1.UpdateMembersDto]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "updateMembers", null);
__decorate([
    (0, common_1.Put)(':id/update-workspace-name'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, workspace_name_update_dto_1.WorkspaceNameUpdateDto]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "updateWorkspaceName", null);
__decorate([
    (0, common_1.Get)('my-related'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "myRelated", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "workspaceDetails", null);
__decorate([
    (0, common_1.Put)('assign-new-members-in-selected-workspace'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_members_dto_1.UpdateMembersDto]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "assignNewMembersInSelectedWorkspace", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "delete", null);
exports.WorkspaceController = WorkspaceController = __decorate([
    (0, common_1.Controller)('workspace'),
    __metadata("design:paramtypes", [workspace_service_1.WorkspaceService])
], WorkspaceController);
//# sourceMappingURL=workspace.controller.js.map