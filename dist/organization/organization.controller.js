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
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const team_size_list_1 = require("../static/team-size-list");
const assign_workspaces_dto_1 = require("./dto/assign-workspaces.dto");
const organization_service_1 = require("./organization.service");
let OrganizationController = class OrganizationController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async myOrgInfo(req) {
        return await this.organizationService.myOrgInfo(req?.user?.id);
    }
    async teamSizeList() {
        return team_size_list_1.teamSizeList;
    }
    async updateMyOrgTeamSize(req, teamSizeId) {
        return await this.organizationService.updateMyOrgTeamSize(req?.user?.id, teamSizeId);
    }
    async updateMyOrgName(req, name) {
        return await this.organizationService.updateMyOrgName(req?.user?.id, name);
    }
    async inviteUserInMyOrg(req, email) {
        return await this.organizationService.inviteUserInMyOrg(req?.user, email);
    }
    async myOrgUsers(req) {
        return await this.organizationService.myOrgUsers(req?.user);
    }
    async removeUserFromMyOrg(req, uId) {
        return await this.organizationService.removeUserFromMyOrg(req?.user, uId);
    }
    async myPendingInvitations(req) {
        return await this.organizationService.myPendingInvitations(req?.user);
    }
    async acceptInvitation(ouId) {
        return await this.organizationService.acceptInvitation(ouId);
    }
    async rejectInvitation(ouId) {
        return await this.organizationService.rejectInvitation(ouId);
    }
    async assignedWorkspacesForUserInMyOrg(req, uId) {
        return await this.organizationService.assignedWorkspacesForUserInMyOrg(req?.user, uId);
    }
    async myOrgWorkspaces(req) {
        return await this.organizationService.myOrgWorkspaces(req?.user);
    }
    async updateWorkspacesForUserInMyOrg(req, assignWorkspacesDto, uId) {
        return await this.organizationService.updateWorkspacesForUserInMyOrg(req?.user, assignWorkspacesDto, uId);
    }
    async myRelatedOrgs(req) {
        return await this.organizationService.myRelatedOrgs(req?.user);
    }
    async myRelatedWorkspacesByOrg(req, oId) {
        return await this.organizationService.myRelatedWorkspacesByOrg(req?.user, oId);
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Get)('my-org-info'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "myOrgInfo", null);
__decorate([
    (0, common_1.Get)('team-size-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "teamSizeList", null);
__decorate([
    (0, common_1.Put)('update-my-org-team-size'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('teamSizeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateMyOrgTeamSize", null);
__decorate([
    (0, common_1.Put)('update-my-org-name'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateMyOrgName", null);
__decorate([
    (0, common_1.Get)('invite-user-in-my-org'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "inviteUserInMyOrg", null);
__decorate([
    (0, common_1.Get)('my-org-users'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "myOrgUsers", null);
__decorate([
    (0, common_1.Delete)('remove-user-from-my-org/:uId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('uId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "removeUserFromMyOrg", null);
__decorate([
    (0, common_1.Get)('my-pending-invitations'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "myPendingInvitations", null);
__decorate([
    (0, common_1.Put)('accept-invitation/:ouId'),
    __param(0, (0, common_1.Param)('ouId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "acceptInvitation", null);
__decorate([
    (0, common_1.Delete)('reject-invitation/:ouId'),
    __param(0, (0, common_1.Param)('ouId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "rejectInvitation", null);
__decorate([
    (0, common_1.Get)('assigned-workspaces-for-user-in-my-org/:uId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('uId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "assignedWorkspacesForUserInMyOrg", null);
__decorate([
    (0, common_1.Get)('my-org-workspaces'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "myOrgWorkspaces", null);
__decorate([
    (0, common_1.Put)('update-workspaces-for-user-in-my-org/:uId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('uId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, assign_workspaces_dto_1.AssignWorkspacesDto, Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateWorkspacesForUserInMyOrg", null);
__decorate([
    (0, common_1.Get)('my-related-orgs'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "myRelatedOrgs", null);
__decorate([
    (0, common_1.Get)('my-related-workspaces-by-org/:oId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('oId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "myRelatedWorkspacesByOrg", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, common_1.Controller)('organization'),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map