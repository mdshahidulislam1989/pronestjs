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
exports.OrgTaskTypeService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const responses_1 = require("../utils/responses");
const typeorm_1 = require("typeorm");
let OrgTaskTypeService = class OrgTaskTypeService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getSelectedWorkspaceOrgTaskTypes(authUser) {
        return await this.dataSource.query(`
        SELECT ott.id, ott.name, ott.createdAt FROM org_task_types ott
        WHERE ott.organizationId = ${authUser.selectedWorkspace.organizationId} 
        ORDER BY ott.id DESC
    `);
    }
    async createInSelectedOrg(authUser, saveDto) {
        const [{ count }] = await this.dataSource.query(`
    SELECT
    COUNT(*) AS count
    FROM
        org_task_types ott
    WHERE
        ott.organizationId = ${authUser.selectedWorkspace.organizationId} AND 
        BINARY ott.name = "${saveDto.name}"
    `);
        if (count > 0)
            return (0, responses_1.FailedResponse)(`In the current organization, this "${saveDto.name}" task type already exists.`);
        await this.dataSource.query(`
    INSERT INTO org_task_types(
        name,
        createdById,
        updatedById,
        organizationId
    )
    VALUES("${saveDto.name}", ${authUser.id}, ${authUser.id}, ${authUser.selectedWorkspace.organizationId})
    `);
        return (0, responses_1.SuccessResponse)('Task type added!');
    }
    async updateInSelectedOrg(authUser, id, saveDto) {
        const [{ count }] = await this.dataSource.query(`
    SELECT
    COUNT(*) AS count
    FROM
        org_task_types ott
    WHERE
        ott.organizationId = ${authUser.selectedWorkspace.organizationId} AND 
        BINARY ott.name = "${saveDto.name}"
        AND ott.id != ${id}
    `);
        if (count > 0)
            return (0, responses_1.FailedResponse)(`In the current organization, this "${saveDto.name}" task type already exists.`);
        await this.dataSource.query(`
    UPDATE
    org_task_types ott
    SET
        ott.name = "${saveDto.name}",
        ott.updatedById = ${authUser.id}
    WHERE
        ott.id = ${id}
    `);
        return (0, responses_1.SuccessResponse)('Task type updated successfully!');
    }
    async delete(id) {
        try {
            await this.dataSource.manager.delete(db_1.OrgTaskType, { id });
            return (0, responses_1.SuccessResponse)('Task type removed!');
        }
        catch (e) {
            return (0, responses_1.FailedResponse)('This task type is currently in use!');
        }
    }
};
exports.OrgTaskTypeService = OrgTaskTypeService;
exports.OrgTaskTypeService = OrgTaskTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], OrgTaskTypeService);
//# sourceMappingURL=org-task-type.service.js.map