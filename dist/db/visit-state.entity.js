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
exports.VisitState = void 0;
const visit_states_1 = require("../static/visit-states");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const visit_attachment_entity_1 = require("./visit-attachment.entity");
const visit_entity_1 = require("./visit.entity");
let VisitState = class VisitState extends base_entity_1.BaseEntity {
};
exports.VisitState = VisitState;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], VisitState.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: visit_states_1.VisitStates, default: visit_states_1.VisitStates.in }),
    __metadata("design:type", Number)
], VisitState.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VisitState.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], VisitState.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VisitState.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VisitState.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VisitState.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => visit_entity_1.Visit, visit => visit.states, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", visit_entity_1.Visit)
], VisitState.prototype, "visit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visit_attachment_entity_1.VisitAttachment, visitAttachment => visitAttachment.visitState),
    __metadata("design:type", Array)
], VisitState.prototype, "attachments", void 0);
exports.VisitState = VisitState = __decorate([
    (0, typeorm_1.Entity)({ name: 'visit_states' })
], VisitState);
//# sourceMappingURL=visit-state.entity.js.map