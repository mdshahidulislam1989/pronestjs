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
exports.OrgTaskCategory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const organization_entity_1 = require("./organization.entity");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("./user.entity");
let OrgTaskCategory = class OrgTaskCategory extends base_entity_1.BaseEntity {
};
exports.OrgTaskCategory = OrgTaskCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], OrgTaskCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrgTaskCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.createdTaskCategories),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], OrgTaskCategory.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.updatedTaskCategories),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], OrgTaskCategory.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, organization => organization.taskCategories),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", organization_entity_1.Organization)
], OrgTaskCategory.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, task => task.category),
    __metadata("design:type", Array)
], OrgTaskCategory.prototype, "tasks", void 0);
exports.OrgTaskCategory = OrgTaskCategory = __decorate([
    (0, typeorm_1.Entity)({ name: 'org_task_categories' })
], OrgTaskCategory);
//# sourceMappingURL=org-task-category.entity.js.map