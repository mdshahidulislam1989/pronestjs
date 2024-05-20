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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_1 = require("../db");
const notification_service_1 = require("../notification/notification.service");
const responses_1 = require("../utils/responses");
const typeorm_2 = require("typeorm");
let OrganizationService = class OrganizationService {
    constructor(organizationRepository, organizationUserRepository, userRepository, dataSource, notificationService) {
        this.organizationRepository = organizationRepository;
        this.organizationUserRepository = organizationUserRepository;
        this.userRepository = userRepository;
        this.dataSource = dataSource;
        this.notificationService = notificationService;
    }
    async myOrgInfo(userId) {
        return this.dataSource.query(`
    select * from organizations where createdById=${userId}
    `);
    }
    async updateMyOrgTeamSize(userId, teamSizeId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const org = await this.organizationRepository.findOneBy({ createdBy: user });
        await this.organizationRepository.update({ id: org.id }, { teamSize: teamSizeId });
        return (0, responses_1.SuccessResponse)('Team size added.');
    }
    async updateMyOrgName(userId, name) {
        await this.dataSource.query(`
    UPDATE
        organizations
    SET NAME = "${name}"
    WHERE
        createdById = ${userId}
    `);
        return (0, responses_1.SuccessResponse)('Name updated.');
    }
    async inviteUserInMyOrg(authUser, email) {
        const slots = await this.getOrgUserSlots(authUser.organizationId);
        if (slots.free < 0)
            return (0, responses_1.FailedResponse)('You have no free slot to invite any user!');
        const isExists = await this.userRepository.findOne({
            where: [{ email }, { loginId: email }],
        });
        if (!isExists)
            return (0, responses_1.FailedResponse)('User doesn’t exist! Please ask your employee to install this app and sign up first. Then try again!');
        const alreadyAddedOrInvited = await this.dataSource
            .createQueryBuilder(db_1.OrganizationUser, 'ou')
            .where('userId = :userId', { userId: isExists.id })
            .andWhere('organizationId = :organizationId', { organizationId: authUser.organizationId })
            .getOne();
        if (alreadyAddedOrInvited)
            return (0, responses_1.FailedResponse)(`Already ${alreadyAddedOrInvited.isPending ? 'invited' : 'added'}!`);
        await this.dataSource.query(`INSERT INTO organization_users (userId, organizationId, isPending) VALUES (${isExists.id},${authUser.organizationId},${true})`);
        const [o] = await this.dataSource.query(`SELECT o.name FROM organizations o WHERE o.id=${authUser.organizationId}`);
        await this.notificationService.sendNotification(isExists.id, {
            title: `New Invitation!`,
            body: `You have a new organization invitation to join '${o.name}'`,
            senderId: authUser.id,
        });
        return (0, responses_1.SuccessResponse)('Invitation sent!');
    }
    async myOrgUsers(authUser) {
        const slots = await this.getOrgUserSlots(authUser.organizationId);
        const users = await this.dataSource.query(`
    SELECT
        u.id,
        u.name,
        u.image,
        u.loginId,
        u.email,
        ou.isPending,
        (SELECT COUNT(*) FROM workspace_users wu LEFT JOIN workspaces w ON w.id=wu.workspaceId WHERE wu.userId = u.id AND w.organizationId=${authUser.organizationId}) AS totalWorkspacesInOrg
    FROM
        organization_users ou
    LEFT JOIN users u ON
        u.id = ou.userId
    WHERE
        ou.organizationId = ${authUser.organizationId}
    GROUP BY
        u.id
    ORDER BY
      ou.isPending DESC, u.name ASC
    `);
        return { slots, users };
    }
    async removeUserFromMyOrg(authUser, uId) {
        if (authUser.id == uId)
            return (0, responses_1.FailedResponse)('Organization owner can not be removed!');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager
                .createQueryBuilder()
                .delete()
                .from(db_1.OrganizationUser)
                .where('userId = :userId', { userId: uId })
                .andWhere('organizationId	= :organizationId', { organizationId: authUser.organizationId })
                .execute();
            const workspacesOfOrg = await queryRunner.manager.query(`
        SELECT
            id
        FROM
            workspaces w
        WHERE
            w.organizationId = ${authUser.organizationId}
      `);
            await Promise.all(workspacesOfOrg.map(async (w) => {
                await queryRunner.manager.query(`
          DELETE
          FROM
              workspace_users
          WHERE
              workspaceId = ${w.id} AND userId = ${uId}
        `);
            }));
            await queryRunner.manager.query(`
      DELETE otu FROM org_team_users otu 
      WHERE 
      otu.teamId IN (SELECT ot.id FROM org_teams ot WHERE ot.organizationId=${authUser.organizationId})
      AND otu.userId=${uId}
      `);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('User removed!');
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not remove user!');
        }
    }
    async myPendingInvitations(authUser) {
        return await this.dataSource
            .createQueryBuilder(db_1.OrganizationUser, 'ou')
            .where('ou.userId = :userId', { userId: authUser.id })
            .andWhere('ou.isPending = :isPending', { isPending: true })
            .leftJoin('ou.organization', 'o')
            .select(['ou.id AS ouId', 'ou.createdAt AS invitedAt', 'ou.isPending AS isPending', 'o.name AS orgName'])
            .orderBy('ou.id', 'DESC')
            .getRawMany();
    }
    async acceptInvitation(ouId) {
        await this.organizationUserRepository.update({ id: ouId }, { isPending: false });
        return (0, responses_1.SuccessResponse)('Invitation accepted!');
    }
    async rejectInvitation(ouId) {
        await this.organizationUserRepository.delete({ id: ouId, isPending: true });
        return (0, responses_1.SuccessResponse)('Invitation rejected!');
    }
    async assignedWorkspacesForUserInMyOrg(authUser, uId) {
        return await this.dataSource.query(`
    SELECT
    w.id,
    w.name
    FROM
        workspace_users wu
    LEFT JOIN users u ON
        u.id = wu.userId
    LEFT JOIN workspaces w ON
        w.id = wu.workspaceId
    LEFT JOIN organizations o ON
        o.id = w.organizationId
    WHERE
        wu.userId = ${uId} AND o.id = ${authUser.organizationId}
    `);
    }
    async myOrgWorkspaces(authUser) {
        return await this.dataSource
            .createQueryBuilder(db_1.Workspace, 'w')
            .where('organizationId = :organizationId', { organizationId: authUser.organizationId })
            .orderBy('w.name', 'ASC')
            .getMany();
    }
    async updateWorkspacesForUserInMyOrg(authUser, assignWorkspacesDto, uId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await Promise.all(assignWorkspacesDto.workspaceIds.map(async (workspaceId) => {
                const count = await queryRunner.manager
                    .createQueryBuilder(db_1.WorkspaceUser, 'wu')
                    .where('wu.workspaceId = :workspaceId', { workspaceId })
                    .andWhere('wu.userId = :userId', { userId: uId })
                    .getCount();
                if (count < 1) {
                    await queryRunner.manager.query(`INSERT INTO workspace_users (roleId, isSelected, workspaceId, userId) VALUES (${3}, ${0}, ${workspaceId}, ${uId})`);
                }
            }));
            if (assignWorkspacesDto.workspaceIds.length > 0) {
                const workspaceIds = assignWorkspacesDto.workspaceIds.join(',');
                await queryRunner.manager.query(`
        DELETE wu
        FROM
            workspace_users wu
        LEFT JOIN workspaces w ON
            w.id = wu.workspaceId
        WHERE
            w.organizationId = ${authUser.organizationId} AND 
            wu.userId = ${uId} AND 
            wu.roleId != 1 AND 
            wu.workspaceId NOT IN(${workspaceIds})
      `);
            }
            else {
                await queryRunner.manager.query(`
        DELETE wu
        FROM
            workspace_users wu
        LEFT JOIN workspaces w ON
            w.id = wu.workspaceId
        WHERE
            w.organizationId = ${authUser.organizationId} AND 
            wu.userId = ${uId} AND 
            wu.roleId != 1 
      `);
            }
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return (0, responses_1.SuccessResponse)('Projects assigned!');
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Failed to assign projects! Please try again.`');
        }
    }
    async myRelatedOrgs(authUser) {
        return await this.dataSource.query(`
    SELECT
    o.id,
    o.name,
    o.image
    FROM
    organization_users ou
    LEFT JOIN organizations o ON
    o.id = ou.organizationId
    WHERE
    ou.userId = ${authUser.id} AND ou.isPending = 0
    `);
    }
    async myRelatedWorkspacesByOrg(authUser, oId) {
        return await this.dataSource.query(`
    SELECT
        w.id, w.name, wu.roleId, wu.isSelected, w.createdAt, w.updatedAt,
        (SELECT count(*) from workspace_users where workspaceId=w.id) AS totalMembers
    FROM
        workspace_users wu
        
        LEFT JOIN workspaces w ON w.id=wu.workspaceId 
    WHERE
        wu.userId = ${authUser.id} AND w.organizationId=${oId}
    `);
    }
    async getOrgUserSlots(organizationId) {
        let userLimit = await this.dataSource.query(`
    SELECT
    o.userLimit
    FROM
        organizations o
    WHERE
        o.id = ${organizationId}
    `);
        userLimit = userLimit[0]?.userLimit | 0;
        let added = await this.dataSource.query(`
    SELECT
    COUNT(*) AS added
    FROM
        organization_users ou
    WHERE
        ou.organizationId = ${organizationId}
    `);
        added = added[0]?.added | 0;
        return { userLimit, added, free: userLimit - added };
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(db_1.Organization)),
    __param(1, (0, typeorm_1.InjectRepository)(db_1.OrganizationUser)),
    __param(2, (0, typeorm_1.InjectRepository)(db_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        notification_service_1.NotificationService])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map