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
exports.Visit = void 0;
const visit_states_1 = require("../static/visit-states");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const org_team_entity_1 = require("./org-team.entity");
const organization_entity_1 = require("./organization.entity");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("./user.entity");
const visit_state_entity_1 = require("./visit-state.entity");
const workspace_entity_1 = require("./workspace.entity");
let Visit = class Visit extends base_entity_1.BaseEntity {
};
exports.Visit = Visit;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Visit.prototype, "endedAt", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Visit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Visit.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Visit.prototype, "totalPauseTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: visit_states_1.VisitStates, default: visit_states_1.VisitStates.in }),
    __metadata("design:type", Number)
], Visit.prototype, "currentStateId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visit_state_entity_1.VisitState, visitState => visitState.visit),
    __metadata("design:type", Array)
], Visit.prototype, "states", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.visits),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Visit.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.Task, task => task.visits, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", task_entity_1.Task)
], Visit.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workspace_entity_1.Workspace, workspace => workspace.visits, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", workspace_entity_1.Workspace)
], Visit.prototype, "workspace", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, organization => organization.visits),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", organization_entity_1.Organization)
], Visit.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => org_team_entity_1.OrgTeam, orgTeam => orgTeam.visits),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", org_team_entity_1.OrgTeam)
], Visit.prototype, "team", void 0);
exports.Visit = Visit = __decorate([
    (0, typeorm_1.Entity)({ name: 'visits' })
], Visit);
//# sourceMappingURL=visit.entity.js.map