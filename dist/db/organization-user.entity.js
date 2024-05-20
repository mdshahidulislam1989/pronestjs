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
exports.OrganizationUser = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const index_1 = require("./index");
let OrganizationUser = class OrganizationUser extends base_entity_1.BaseEntity {
};
exports.OrganizationUser = OrganizationUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], OrganizationUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationUser.prototype, "isPending", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.User, user => user.organizationUsers),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", index_1.User)
], OrganizationUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.Organization, organization => organization.organizationUsers),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", index_1.Organization)
], OrganizationUser.prototype, "organization", void 0);
exports.OrganizationUser = OrganizationUser = __decorate([
    (0, typeorm_1.Entity)({ name: 'organization_users' })
], OrganizationUser);
//# sourceMappingURL=organization-user.entity.js.map