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
exports.WorkspaceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth/auth.service");
const db_1 = require("../db");
const notification_service_1 = require("../notification/notification.service");
const user_roles_1 = require("../static/user-roles");
const responses_1 = require("../utils/responses");
const typeorm_2 = require("typeorm");
let WorkspaceService = class WorkspaceService {
    constructor(userRepository, orgRepository, workspaceRepository, workspaceUserRepository, dataSource, notificationService, authService) {
        this.userRepository = userRepository;
        this.orgRepository = orgRepository;
        this.workspaceRepository = workspaceRepository;
        this.workspaceUserRepository = workspaceUserRepository;
        this.dataSource = dataSource;
        this.notificationService = notificationService;
        this.authService = authService;
    }
    async setMyCurrentWorkspace(user, workspaceId) {
        await this.dataSource
            .createQueryBuilder(db_1.WorkspaceUser, 'wu')
            .update()
            .set({ isSelected: false })
            .where('userId = :userId', { userId: user.id })
            .execute();
        await this.dataSource
            .createQueryBuilder(db_1.WorkspaceUser, 'wu')
            .update()
            .set({ isSelected: true })
            .where('userId = :userId', { userId: user.id })
            .andWhere('workspaceId = :workspaceId', { workspaceId })
            .execute();
        const userInfo = await this.userRepository.findOneBy({ id: user.id });
        const { accessToken } = await this.authService.generateAccessTokenAndRefreshToken(userInfo);
        return (0, responses_1.SuccessResponse)('Project switched!', { accessToken });
    }
    async createInitialAndSelect(user, initialWorkspaceCreateDto) {
        const authUser = await this.userRepository.findOneBy({ id: user.id });
        const org = await this.orgRepository.findOneBy({ id: user.organizationId });
        const w = new db_1.Workspace();
        w.createdBy = authUser;
        w.updatedBy = authUser;
        w.name = initialWorkspaceCreateDto.name;
        w.organization = org;
        const workspace = await this.workspaceRepository.save(w);
        const wu = new db_1.WorkspaceUser();
        wu.isSelected = true;
        wu.roleId = 1;
        wu.user = authUser;
        wu.workspace = workspace;
        await this.workspaceUserRepository.save(wu);
        const { accessToken } = await this.authService.generateAccessTokenAndRefreshToken(authUser);
        return (0, responses_1.SuccessResponse)('Your project has been created and selected by default!', { accessToken });
    }
    async orgNotPendingUsers(authUser) {
        return await this.dataSource.query(`
    SELECT
    u.id,
    u.name,
    u.image
    FROM
        organization_users ou
    LEFT JOIN users u ON
        ou.userId = u.id
    WHERE
        ou.organizationId = ${authUser.selectedWorkspace.organizationId}
        AND ou.isPending = FALSE
    ORDER BY u.name ASC
    `);
    }
    async selectedWorkspaceUsers(authUser) {
        return await this.workspaceUserRepository
            .createQueryBuilder('wu')
            .where('wu.workspaceId=:workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
            .leftJoin('wu.user', 'u')
            .select(['u.id AS id', 'u.name AS name', 'u.image AS image'])
            .orderBy('u.name', 'ASC')
            .getRawMany();
    }
    async create(user, workspaceCreateDto) {
        const [{ count }] = await this.dataSource.query(`
    SELECT
    COUNT(*) AS count
    FROM
        workspaces w
    WHERE
        w.organizationId = ${user.selectedWorkspace.organizationId} AND 
        BINARY w.name = "${workspaceCreateDto.name}"
    `);
        if (count > 0)
            return (0, responses_1.FailedResponse)(`In the current organization, this "${workspaceCreateDto.name}" project already exists.`);
        const userEntity = await this.userRepository.findOneBy({ id: user.id });
        const orgEntity = await this.orgRepository.findOne({
            where: { id: user.selectedWorkspace.organizationId },
            relations: { createdBy: true },
        });
        const workspaceEntity = new db_1.Workspace();
        workspaceEntity.name = workspaceCreateDto.name;
        workspaceEntity.createdBy = userEntity;
        workspaceEntity.updatedBy = userEntity;
        workspaceEntity.organization = orgEntity;
        const workspaceUserEntity = new db_1.WorkspaceUser();
        workspaceUserEntity.workspace = workspaceEntity;
        workspaceUserEntity.isSelected = false;
        workspaceUserEntity.roleId = user.organizationId == user.selectedWorkspace.organizationId ? 1 : 2;
        workspaceUserEntity.user = userEntity;
        const userIdsWithoutCreatorAndOrgOwner = workspaceCreateDto.userIds.filter(id => id != user.id && id != orgEntity.createdBy.id);
        const usersToSave = await Promise.all(userIdsWithoutCreatorAndOrgOwner.map(async (userId) => {
            const workspaceUserEntity = new db_1.WorkspaceUser();
            workspaceUserEntity.isSelected = false;
            workspaceUserEntity.roleId = 3;
            workspaceUserEntity.user = await this.userRepository.findOneBy({ id: userId });
            workspaceUserEntity.workspace = workspaceEntity;
            return workspaceUserEntity;
        }));
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let isSuccess = true;
        try {
            await queryRunner.manager.save(workspaceEntity);
            await queryRunner.manager.save(workspaceUserEntity);
            if (user.organizationId != user.selectedWorkspace.organizationId) {
                await queryRunner.manager.query(`
          INSERT INTO workspace_users (workspaceId, isSelected, roleId, userId) VALUES (${workspaceEntity.id}, FALSE, 1, ${orgEntity.createdBy.id})
        `);
            }
            await Promise.all(usersToSave.map(async (wu) => {
                if (wu.user) {
                    await queryRunner.manager.save(wu);
                }
            }));
            await this.notificationService.sendNotification(workspaceCreateDto.userIds, {
                title: 'New Project!',
                body: `${workspaceCreateDto.name} has been created.`,
                senderId: user.id,
                organizationId: user.selectedWorkspace.organizationId,
                workspaceId: user.selectedWorkspace.workspaceId,
            });
            await queryRunner.commitTransaction();
        }
        catch {
            await queryRunner.rollbackTransaction();
            isSuccess = false;
        }
        finally {
            await queryRunner.release();
        }
        return isSuccess
            ? (0, responses_1.SuccessResponse)('Project has been created in your default project organization!')
            : (0, responses_1.FailedResponse)('Internal server error. You can try again');
    }
    async updateMembers(user, id, updateMembersDto) {
        let isSuccess = true;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await Promise.all(updateMembersDto.userIds.map(async (userId) => {
                const count = await queryRunner.manager
                    .createQueryBuilder(db_1.WorkspaceUser, 'wu')
                    .where('wu.workspaceId = :workspaceId', { workspaceId: id })
                    .andWhere('wu.userId = :userId', { userId })
                    .getCount();
                if (count < 1) {
                    await queryRunner.manager.query(`INSERT INTO workspace_users (roleId, isSelected, workspaceId, userId) VALUES (${3}, ${0}, ${id}, ${userId})`);
                }
            }));
            if (updateMembersDto.userIds.length > 0) {
                const userIds = updateMembersDto.userIds.join(',');
                await queryRunner.manager.query(`DELETE FROM workspace_users WHERE workspaceId = ${id} AND roleId != 1 AND userId NOT IN (${userIds})`);
            }
            else {
                await queryRunner.manager.query(`DELETE FROM workspace_users WHERE workspaceId = ${id} AND roleId != 1`);
            }
            const [w] = await queryRunner.manager.query(`SELECT w.name FROM workspaces w WHERE w.id=${id}`);
            await this.notificationService.sendNotification(updateMembersDto.userIds, {
                title: 'Project Member Modification!',
                body: `Members updated in '${w.name}'.`,
                senderId: user.id,
                organizationId: user.selectedWorkspace.organizationId,
                workspaceId: user.selectedWorkspace.workspaceId,
            });
            await queryRunner.commitTransaction();
        }
        catch (err) {
            isSuccess = false;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            return isSuccess
                ? (0, responses_1.SuccessResponse)('Succcessfully updated member list!')
                : (0, responses_1.FailedResponse)('Failed! Please try again.');
        }
    }
    async updateWorkspaceName(user, id, workspaceNameUpdateDto) {
        const [{ count }] = await this.dataSource.query(`
    SELECT
    COUNT(*) AS count
    FROM
        workspaces w
    WHERE
        w.organizationId = ${user.selectedWorkspace.organizationId} AND 
        BINARY w.name = "${workspaceNameUpdateDto.name}"
        AND w.id != ${id}
    `);
        if (count > 0)
            return (0, responses_1.FailedResponse)(`In the current organization, this "${workspaceNameUpdateDto.name}" project already exists.`);
        await this.dataSource.query(`
    UPDATE
    workspaces w
    SET
        w.name = "${workspaceNameUpdateDto.name}",
        w.updatedById = ${user.id}
    WHERE
        w.id = ${id}
    `);
        return (0, responses_1.SuccessResponse)('Project updated successfully!');
    }
    async myRelated(authUser) {
        const rawData = await this.dataSource.manager.query(`SELECT FW.workspaceId,FW.roleId,FW.totalMember
      ,W.name
      FROM (
          SELECT TT.workspaceId,TT.roleId,TT.createdAt,COUNT(WU.userId) as totalMember FROM(
            SELECT WU.id,WU.workspaceId,WU.roleId,WU.createdAt
            FROM workspace_users WU
            WHERE WU.userId= ${authUser.id} ORDER BY WU.createdAt DESC
        ) as TT INNER JOIN workspace_users WU ON TT.workspaceId=WU.workspaceId
      GROUP BY TT.workspaceId,TT.RoleId,TT.createdAt ORDER by TT.createdAt DESC) as FW
      INNER JOIN workspaces W ON FW.workspaceId=W.Id
      order by FW.createdAt DESC
      `);
        return rawData;
    }
    async workspaceDetails(id) {
        const workspace = await this.dataSource.query(`SELECT
          w.id,
          w.name,
          COUNT(*) AS totalMember
      FROM
          workspace_users wu
      Right JOIN workspaces w ON
          w.id = wu.workspaceId
      WHERE
          wu.workspaceId = ${id}`);
        const users = await this.dataSource
            .createQueryBuilder(db_1.WorkspaceUser, 'wu')
            .where('wu.workspaceId = :workspaceId', { workspaceId: id })
            .leftJoin('wu.user', 'u')
            .select(['u.id AS id', 'u.name AS name', 'u.image AS image', 'wu.roleId AS roleId'])
            .orderBy('u.name', 'ASC')
            .getRawMany();
        return {
            ...workspace[0],
            users,
        };
    }
    async assignNewMembersInSelectedWorkspace(authUser, updateMembersDto) {
        await Promise.all(updateMembersDto.userIds.map(async (userId) => {
            const count = await this.dataSource
                .createQueryBuilder(db_1.WorkspaceUser, 'wu')
                .where('wu.workspaceId = :workspaceId', { workspaceId: authUser.selectedWorkspace.workspaceId })
                .andWhere('wu.userId = :userId', { userId })
                .getCount();
            if (count < 1) {
                await this.dataSource.query(`
        INSERT INTO workspace_users (roleId, isSelected, workspaceId, userId) VALUES (3, 0, ${authUser.selectedWorkspace.workspaceId}, ${userId})
        
        `);
            }
        }));
        return (0, responses_1.SuccessResponse)('New members assigned!');
    }
    async delete(authUser, id) {
        if (authUser.selectedWorkspace.roleId != user_roles_1.UserRoles.owner)
            return (0, responses_1.FailedResponse)('Only project owner can delete a project!');
        const createdWorkspaces = await this.dataSource.query(`
    SELECT * FROM workspace_users wu WHERE wu.roleId=${user_roles_1.UserRoles.owner} AND wu.userId=${authUser.id}
    `);
        const isItMyWorkspace = createdWorkspaces.find((wu) => wu.workspaceId == id);
        if (!isItMyWorkspace)
            return (0, responses_1.FailedResponse)('You are not owner of this project.');
        if (createdWorkspaces?.length < 2)
            return (0, responses_1.FailedResponse)('There must be a minimum of one project in your organization!');
        const isItSelectedWorkspace = createdWorkspaces.filter((wu) => wu.workspaceId == id && wu.isSelected == true);
        if (isItSelectedWorkspace?.length > 0)
            return (0, responses_1.FailedResponse)('Change your default project to delete this!');
        await this.dataSource.query(`DELETE FROM workspaces WHERE id = ${id}`);
        return (0, responses_1.SuccessResponse)('Project deleted!');
    }
};
exports.WorkspaceService = WorkspaceService;
exports.WorkspaceService = WorkspaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(db_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(db_1.Organization)),
    __param(2, (0, typeorm_1.InjectRepository)(db_1.Workspace)),
    __param(3, (0, typeorm_1.InjectRepository)(db_1.WorkspaceUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        notification_service_1.NotificationService,
        auth_service_1.AuthService])
], WorkspaceService);
//# sourceMappingURL=workspace.service.js.map