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
exports.OrgTeamController = void 0;
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const members_dto_1 = require("./dto/members.dto");
const name_dto_1 = require("./dto/name.dto");
const org_team_service_1 = require("./org-team.service");
let OrgTeamController = class OrgTeamController {
    constructor(orgTeamService) {
        this.orgTeamService = orgTeamService;
    }
    async getAllFromSelectedOrg(req) {
        return await this.orgTeamService.getAllFromSelectedOrg(req?.user);
    }
    async createInSelectedOrg(req, createDto) {
        return await this.orgTeamService.createInSelectedOrg(req?.user, createDto);
    }
    async updateName(req, id, nameDto) {
        return await this.orgTeamService.updateName(req?.user, id, nameDto);
    }
    async members(id) {
        return await this.orgTeamService.members(id);
    }
    async updateMembers(id, membersDto) {
        return await this.orgTeamService.updateMembers(id, membersDto);
    }
    async delete(id) {
        return await this.orgTeamService.delete(id);
    }
};
exports.OrgTeamController = OrgTeamController;
__decorate([
    (0, common_1.Get)('get-all-from-selected-org'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrgTeamController.prototype, "getAllFromSelectedOrg", null);
__decorate([
    (0, common_1.Post)('create-in-selected-org'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dto_1.CreateDto]),
    __metadata("design:returntype", Promise)
], OrgTeamController.prototype, "createInSelectedOrg", null);
__decorate([
    (0, common_1.Put)(':id/update-name'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, name_dto_1.NameDto]),
    __metadata("design:returntype", Promise)
], OrgTeamController.prototype, "updateName", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrgTeamController.prototype, "members", null);
__decorate([
    (0, common_1.Put)(':id/update-members'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, members_dto_1.MembersDto]),
    __metadata("design:returntype", Promise)
], OrgTeamController.prototype, "updateMembers", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrgTeamController.prototype, "delete", null);
exports.OrgTeamController = OrgTeamController = __decorate([
    (0, common_1.Controller)('org-team'),
    __metadata("design:paramtypes", [org_team_service_1.OrgTeamService])
], OrgTeamController);
//# sourceMappingURL=org-team.controller.js.map