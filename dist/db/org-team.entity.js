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
exports.OrgTeam = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const org_team_user_entity_1 = require("./org-team-user.entity");
const organization_entity_1 = require("./organization.entity");
const task_member_entity_1 = require("./task-member.entity");
const visit_entity_1 = require("./visit.entity");
let OrgTeam = class OrgTeam extends base_entity_1.BaseEntity {
};
exports.OrgTeam = OrgTeam;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], OrgTeam.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrgTeam.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, organization => organization.teams),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", organization_entity_1.Organization)
], OrgTeam.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_team_user_entity_1.OrgTeamUser, orgTeamUser => orgTeamUser.team),
    __metadata("design:type", Array)
], OrgTeam.prototype, "orgTeamUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_member_entity_1.TaskMember, taskMember => taskMember.team),
    __metadata("design:type", Array)
], OrgTeam.prototype, "assignedTasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visit_entity_1.Visit, visit => visit.team),
    __metadata("design:type", Array)
], OrgTeam.prototype, "visits", void 0);
exports.OrgTeam = OrgTeam = __decorate([
    (0, typeorm_1.Entity)({ name: 'org_teams' })
], OrgTeam);
//# sourceMappingURL=org-team.entity.js.map