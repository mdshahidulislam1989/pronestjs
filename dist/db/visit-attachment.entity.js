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
exports.VisitAttachment = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const visit_state_entity_1 = require("./visit-state.entity");
let VisitAttachment = class VisitAttachment extends base_entity_1.BaseEntity {
};
exports.VisitAttachment = VisitAttachment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], VisitAttachment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VisitAttachment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => visit_state_entity_1.VisitState, visitState => visitState.attachments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", visit_state_entity_1.VisitState)
], VisitAttachment.prototype, "visitState", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.createdVisitAttachments),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], VisitAttachment.prototype, "createdBy", void 0);
exports.VisitAttachment = VisitAttachment = __decorate([
    (0, typeorm_1.Entity)({ name: 'visit_attachments' })
], VisitAttachment);
//# sourceMappingURL=visit-attachment.entity.js.map