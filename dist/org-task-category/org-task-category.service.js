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
exports.OrgTaskCategoryService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const responses_1 = require("../utils/responses");
const typeorm_1 = require("typeorm");
let OrgTaskCategoryService = class OrgTaskCategoryService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getSelectedWorkspaceOrgTaskCategories(authUser) {
        return await this.dataSource.query(`
        SELECT otc.id, otc.name, otc.createdAt FROM org_task_categories otc
        WHERE otc.organizationId = ${authUser.selectedWorkspace.organizationId} 
        ORDER BY otc.id DESC
    `);
    }
    async createInSelectedOrg(authUser, saveDto) {
        const [{ count }] = await this.dataSource.query(`
    SELECT
    COUNT(*) AS count
    FROM
        org_task_categories otc
    WHERE
        otc.organizationId = ${authUser.selectedWorkspace.organizationId} AND 
        BINARY otc.name = "${saveDto.name}"
    `);
        if (count > 0)
            return (0, responses_1.FailedResponse)(`In the current organization, this "${saveDto.name}" task category already exists.`);
        await this.dataSource.query(`
    INSERT INTO org_task_categories(
        name,
        createdById,
        updatedById,
        organizationId
    )
    VALUES("${saveDto.name}", ${authUser.id}, ${authUser.id}, ${authUser.selectedWorkspace.organizationId})
    `);
        return (0, responses_1.SuccessResponse)('Task category added!');
    }
    async updateInSelectedOrg(authUser, id, saveDto) {
        const [{ count }] = await this.dataSource.query(`
    SELECT
    COUNT(*) AS count
    FROM
        org_task_categories otc
    WHERE
        otc.organizationId = ${authUser.selectedWorkspace.organizationId} AND 
        BINARY otc.name = "${saveDto.name}"
        AND otc.id != ${id}
    `);
        if (count > 0)
            return (0, responses_1.FailedResponse)(`In the current organization, this "${saveDto.name}" task category already exists.`);
        await this.dataSource.query(`
    UPDATE
    org_task_categories otc
    SET
        otc.name = "${saveDto.name}",
        otc.updatedById = ${authUser.id}
    WHERE
        otc.id = ${id}
    `);
        return (0, responses_1.SuccessResponse)('Task category updated successfully!');
    }
    async delete(id) {
        try {
            await this.dataSource.manager.delete(db_1.OrgTaskCategory, { id });
            return (0, responses_1.SuccessResponse)('Task category removed!');
        }
        catch (e) {
            return (0, responses_1.FailedResponse)('This task category is currently in use!');
        }
    }
};
exports.OrgTaskCategoryService = OrgTaskCategoryService;
exports.OrgTaskCategoryService = OrgTaskCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], OrgTaskCategoryService);
//# sourceMappingURL=org-task-category.service.js.map