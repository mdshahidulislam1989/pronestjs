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
exports.OrgTeamService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const responses_1 = require("../utils/responses");
const typeorm_1 = require("typeorm");
let OrgTeamService = class OrgTeamService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getAllFromSelectedOrg(authUser) {
        return await this.dataSource.query(`
    SELECT
        ot.id,
        ot.name,
        SUM(
            (
                CASE WHEN otu.id IS NOT NULL THEN 1 ELSE 0
            END
        )
    ) AS totalMembers
    FROM
        org_teams ot
    LEFT JOIN org_team_users otu ON
        otu.teamId = ot.id
    WHERE
        ot.organizationId = ${authUser.selectedWorkspace.organizationId}
    GROUP BY
        ot.id
    DESC
        ;
    `);
    }
    async createInSelectedOrg(authUser, createDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const [{ count }] = await queryRunner.manager.query(`
        SELECT
        COUNT(*) AS count
        FROM
            org_teams ot
        WHERE
            ot.organizationId = ${authUser.selectedWorkspace.organizationId} AND 
        BINARY ot.name = "${createDto.name}"
    `);
            if (count > 0) {
                await queryRunner.release();
                return (0, responses_1.FailedResponse)(`In the current organization, this "${createDto.name}" team already exists.`);
            }
            const team = await queryRunner.manager.query(`
        INSERT INTO org_teams (name, organizationId) VALUES ("${createDto.name}", ${authUser.selectedWorkspace.organizationId})
        `);
            await Promise.all(createDto.userIds.map(async (uId) => {
                await queryRunner.manager.query(`
            INSERT INTO org_team_users (teamId, userId) VALUES (${team?.insertId}, ${uId})
        `);
            }));
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Team created!');
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not create team!');
        }
    }
    async updateName(authUser, id, nameDto) {
        const [{ count }] = await this.dataSource.query(`
        SELECT
        COUNT(*) AS count
        FROM
            org_teams ot
        WHERE
            ot.organizationId = ${authUser.selectedWorkspace.organizationId} AND 
            BINARY ot.name = "${nameDto.name}"
            AND ot.id != ${id}
    `);
        if (count > 0)
            return (0, responses_1.FailedResponse)(`In the current organization, this "${nameDto.name}" team already exists.`);
        await this.dataSource.getRepository(db_1.OrgTeam).update({ id }, { name: nameDto.name });
        return (0, responses_1.SuccessResponse)('Name updated!');
    }
    async members(id) {
        return await this.dataSource
            .createQueryBuilder(db_1.OrgTeamUser, 'otu')
            .where('otu.teamId = :teamId', { teamId: id })
            .leftJoin('otu.user', 'u')
            .select(['u.id AS id', 'u.name AS name', 'u.image AS image'])
            .getRawMany();
    }
    async updateMembers(id, membersDto) {
        await Promise.all(membersDto.userIds.map(async (userId) => {
            const count = await this.dataSource
                .createQueryBuilder(db_1.OrgTeamUser, 'otu')
                .where('otu.teamId = :teamId', { teamId: id })
                .andWhere('otu.userId = :userId', { userId })
                .getCount();
            if (count < 1) {
                await this.dataSource.query(`INSERT INTO org_team_users (teamId, userId) VALUES (${id}, ${userId})`);
            }
        }));
        if (membersDto.userIds.length > 0) {
            const userIds = membersDto.userIds.join(',');
            await this.dataSource.query(`DELETE FROM org_team_users WHERE teamId = ${id} AND userId NOT IN (${userIds})`);
        }
        else {
            await this.dataSource.query(`DELETE FROM org_team_users WHERE teamId = ${id}`);
        }
        return (0, responses_1.SuccessResponse)('Team members updated!');
    }
    async delete(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.query(`
      UPDATE
          task_members
      SET
          teamId = NULL
      WHERE
          teamId = ${id}
      `);
            await queryRunner.manager.query(`
      UPDATE
          visits
      SET
          teamId = NULL
      WHERE
          teamId = ${id}
      `);
            await queryRunner.manager.query(`DELETE FROM org_team_users WHERE teamId = ${id}`);
            await queryRunner.manager.query(`DELETE FROM org_teams WHERE id = ${id}`);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Team deteted!');
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not delete team!');
        }
    }
};
exports.OrgTeamService = OrgTeamService;
exports.OrgTeamService = OrgTeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], OrgTeamService);
//# sourceMappingURL=org-team.service.js.map