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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const config_1 = require("../config");
const db_1 = require("../db");
const mail_service_1 = require("../mail/mail.service");
const generate_otp_1 = require("../utils/generate-otp");
const responses_1 = require("../utils/responses");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(userRepository, organizationRepository, organizationUserRepository, workspaceUserRepository, jwtService, mailService, dataSource) {
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
        this.organizationUserRepository = organizationUserRepository;
        this.workspaceUserRepository = workspaceUserRepository;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.dataSource = dataSource;
    }
    async verifySignupEmail(email) {
        const user = await this.userRepository.findOne({ where: { loginId: email } });
        if (user)
            return (0, responses_1.FailedResponse)('Email already exists!');
        this.otp = (0, generate_otp_1.GenerateOtp)();
        await this.mailService.sendOtp(email, this.otp);
        return { ...(0, responses_1.SuccessResponse)('Otp sent to your email! Please check your spam as well.'), otp: this.otp };
    }
    async verifyOtp(otp) {
        if (!otp || this.otp !== otp)
            return (0, responses_1.FailedResponse)('OTP does not matched!');
        this.otp = null;
        return (0, responses_1.SuccessResponse)('OTP verified!');
    }
    async register(registerDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const isExists = await queryRunner.manager.getRepository(db_1.User).findOne({
                where: [{ email: registerDto.email }, { loginId: registerDto.email }],
            });
            if (isExists)
                return (0, responses_1.FailedResponse)('Email or login id already exists!');
            const hash = await bcrypt.hash(registerDto.password, config_1.GlobalConfig.hashSaltOrRounds);
            const user = await queryRunner.manager.getRepository(db_1.User).save({
                isEmailVerified: true,
                email: registerDto.email,
                loginId: registerDto.email,
                name: registerDto.name,
                password: hash,
                profileUpdatedAt: new Date(),
            });
            await queryRunner.manager.getRepository(db_1.NotificationSettings).save({ user: user });
            const org = await queryRunner.manager.getRepository(db_1.Organization).save({
                name: user.name + '-org-' + new Date().getTime(),
                userLimit: 50,
                createdBy: user,
            });
            await queryRunner.manager.getRepository(db_1.OrganizationUser).save({ user: user, organization: org, isPending: false });
            await queryRunner.manager.query(`
      INSERT INTO org_task_types(name, createdById, updatedById, organizationId) VALUES
      ("Visit Customer", ${user.id}, ${user.id}, ${org.id}),
      ("Office Cleaning", ${user.id}, ${user.id}, ${org.id}),
      ("Appliance Installation", ${user.id}, ${user.id}, ${org.id}),
      ("Lawn Mowing", ${user.id}, ${user.id}, ${org.id}),
      ("Fix leaking", ${user.id}, ${user.id}, ${org.id}),
      ("Delivery", ${user.id}, ${user.id}, ${org.id})
      `);
            await queryRunner.manager.query(`
      INSERT INTO org_task_categories(name, createdById, updatedById, organizationId) VALUES
      ("Cleaning", ${user.id}, ${user.id}, ${org.id}),
      ("Maintenance", ${user.id}, ${user.id}, ${org.id}),
      ("Repair", ${user.id}, ${user.id}, ${org.id}),
      ("Installation", ${user.id}, ${user.id}, ${org.id}),
      ("Inspection", ${user.id}, ${user.id}, ${org.id}),
      ("Landscaping", ${user.id}, ${user.id}, ${org.id}),
      ("Transportation", ${user.id}, ${user.id}, ${org.id})
      `);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            await this.mailService.registrationWelcome(registerDto.email, registerDto.name);
            const accessToken_refreshToken = await this.generateAccessTokenAndRefreshToken(user);
            await this.userRepository.update(user.id, {
                lastLoginAt: new Date(),
                refreshToken: accessToken_refreshToken.refreshToken,
            });
            return (0, responses_1.SuccessResponse)('Account created.', accessToken_refreshToken);
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return (0, responses_1.FailedResponse)('Could not create account! Please try again.');
        }
    }
    async login(loginDto) {
        const user = await this.userRepository.findOne({
            where: { loginId: loginDto.loginId },
            select: ['id', 'loginId', 'password', 'isActive'],
        });
        if (!user)
            return (0, responses_1.FailedResponse)('Incorrect login id or password!');
        if (!user.isActive)
            return (0, responses_1.FailedResponse)('This account is currently inactive!');
        const isPassMatched = await bcrypt.compare(loginDto.password, user.password);
        if (!isPassMatched)
            return (0, responses_1.FailedResponse)('Incorrect login id or password!');
        const accessToken_refreshToken = await this.generateAccessTokenAndRefreshToken(user);
        await this.userRepository.update(user.id, {
            lastLoginAt: new Date(),
            refreshToken: accessToken_refreshToken.refreshToken,
        });
        return accessToken_refreshToken;
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (!user)
            return (0, responses_1.FailedResponse)("Email doesn't exist!");
        this.otp = (0, generate_otp_1.GenerateOtp)();
        await this.mailService.sendOtp(email, this.otp);
        return { ...(0, responses_1.SuccessResponse)('Otp sent to your email! Please check your spam as well.'), otp: this.otp };
    }
    async forgotPasswordUpdate(forgotPasswordUpdateDto) {
        const hash = await bcrypt.hash(forgotPasswordUpdateDto.newPassword, config_1.GlobalConfig.hashSaltOrRounds);
        await this.userRepository.update({ email: forgotPasswordUpdateDto.email }, { password: hash, refreshToken: null });
        return (0, responses_1.SuccessResponse)('Password changed successfully.');
    }
    async changePassword(authUser, changePasswordDto) {
        const user = await this.userRepository.findOne({
            where: { id: authUser.id },
            select: ['id', 'password'],
        });
        const isPassMatched = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
        if (!isPassMatched)
            return (0, responses_1.FailedResponse)('Incorrect old password!');
        const hash = await bcrypt.hash(changePasswordDto.newPassword, config_1.GlobalConfig.hashSaltOrRounds);
        await this.userRepository.update({ id: authUser.id }, { password: hash, refreshToken: null });
        return (0, responses_1.SuccessResponse)('Password changed successfully.');
    }
    async profile(userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const notificationSettings = (await this.dataSource
            .createQueryBuilder(db_1.NotificationSettings, 'ns')
            .where('ns.userId=:userId', { userId: user.id })
            .select(['ns.fcmToken'])
            .getOne()) || { fcmToken: null };
        const selectedWorkspace = await this.workspaceUserRepository
            .createQueryBuilder('workspaceUser')
            .where('userId = :userId', { userId: user.id })
            .andWhere('isSelected = :isSelected', { isSelected: true })
            .leftJoin('workspaceUser.workspace', 'workspace')
            .leftJoin('workspace.organization', 'organization')
            .select([
            'workspaceUser.roleId AS wRoleId',
            'workspace.id AS wId',
            'workspace.name AS wName',
            'organization.id AS oId',
            'organization.name AS oName',
        ])
            .getRawOne();
        return { ...user, ...notificationSettings, selectedWorkspace };
    }
    async profileSimpleInfo(authUser) {
        const totalWorkspaces = await this.dataSource
            .createQueryBuilder(db_1.WorkspaceUser, 'wu')
            .where('wu.userId=:userId', { userId: authUser.id })
            .leftJoinAndSelect('wu.workspace', 'w')
            .leftJoinAndSelect('w.organization', 'o')
            .andWhere('o.id=:oId', { oId: authUser.selectedWorkspace.organizationId })
            .getCount();
        const myTotalPendingInvitations = await this.dataSource
            .createQueryBuilder(db_1.OrganizationUser, 'ou')
            .where('ou.userId=:userId', { userId: authUser.id })
            .andWhere('ou.isPending = 1')
            .getCount();
        const myTotalOrganizationUsers = await this.dataSource
            .createQueryBuilder(db_1.OrganizationUser, 'ou')
            .where('ou.organizationId = :organizationId', { organizationId: authUser.organizationId })
            .getCount();
        const purchasedPackage = null;
        return { totalWorkspaces, myTotalPendingInvitations, myTotalOrganizationUsers, purchasedPackage };
    }
    async updateProfile(userId, updateProfileDto) {
        await this.userRepository.update({ id: userId }, {
            name: updateProfileDto.name,
            email: updateProfileDto.email,
            dialCode: updateProfileDto.dialCode,
            phone: updateProfileDto.phone,
            address: updateProfileDto.address,
        });
        return (0, responses_1.SuccessResponse)('Profile updated!');
    }
    async updateProfilePic(userId, image) {
        await this.userRepository.update({ id: userId }, { image: image == '' || image == null ? null : image });
        return (0, responses_1.SuccessResponse)('Photo updated!');
    }
    async updateFcmToken(userId, fcmToken) {
        console.log(userId, fcmToken);
        await this.dataSource.query(`
    UPDATE
        notification_settings
    SET
        fcmToken = ${fcmToken == '' || fcmToken == null ? null : `"${fcmToken}"`}
    WHERE
        userId = ${userId}
    `);
        return (0, responses_1.SuccessResponse)('FCM token updated!');
    }
    async deleteMyAccount(userId) {
        await this.userRepository.update({ id: userId }, { isActive: false });
        return (0, responses_1.SuccessResponse)('Account deleted!');
    }
    async myNotificationPreferences(authUser) {
        return await this.dataSource
            .createQueryBuilder(db_1.NotificationSettings, 'ns')
            .select(['ns.pushNotification'])
            .where('ns.userId=:userId', { userId: authUser.id })
            .getOne();
    }
    async updateMyNotificationPreferences(authUser, updateNotificationPreferencesDto) {
        await this.dataSource.query(`
    UPDATE
    notification_settings ns
    SET
        pushNotification = ${updateNotificationPreferencesDto.pushNotification}
    WHERE
        userId=${authUser.id}
    `);
        return (0, responses_1.SuccessResponse)('Preferences updated!');
    }
    async refreshToken(refreshTokenDto) {
        try {
            const refreshTokenPayload = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
                secret: config_1.GlobalConfig.jwtRefreshTokenSecret,
            });
            if (!refreshTokenPayload?.id)
                new common_1.UnauthorizedException();
            const user = await this.profile(refreshTokenPayload.id);
            if (refreshTokenDto.refreshToken !== user.refreshToken)
                throw new common_1.UnauthorizedException();
            if (!user || !user.isActive || !user.refreshToken)
                throw new common_1.UnauthorizedException();
            const { accessToken } = await this.generateAccessTokenAndRefreshToken(user);
            const refreshToken = user.refreshToken;
            return { accessToken, refreshToken };
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async generateAccessTokenAndRefreshToken(user) {
        const refreshToken = await this.jwtService.signAsync({ id: user.id }, { expiresIn: config_1.GlobalConfig.jwtRefreshTokenExpiresIn, secret: config_1.GlobalConfig.jwtRefreshTokenSecret });
        const [myOrg] = await this.dataSource.query(`
      select id from organizations o where o.createdById = ${user.id} 
      `);
        const workspaceUser = await this.workspaceUserRepository
            .createQueryBuilder('wu')
            .where('userId = :userId', { userId: user.id })
            .andWhere('isSelected = :isSelected', { isSelected: true })
            .leftJoin('wu.workspace', 'workspace')
            .leftJoin('workspace.organization', 'organization')
            .select(['organization.id AS organizationId', 'workspace.id AS workspaceId', 'wu.roleId AS roleId'])
            .getRawOne();
        const payload = {
            id: user.id,
            loginId: user.loginId,
            organizationId: myOrg.id,
            selectedWorkspace: workspaceUser && {
                organizationId: workspaceUser?.organizationId,
                workspaceId: workspaceUser?.workspaceId,
                roleId: workspaceUser?.roleId,
            },
        };
        return {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(db_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(db_1.Organization)),
    __param(2, (0, typeorm_1.InjectRepository)(db_1.OrganizationUser)),
    __param(3, (0, typeorm_1.InjectRepository)(db_1.WorkspaceUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        mail_service_1.MailService,
        typeorm_2.DataSource])
], AuthService);
//# sourceMappingURL=auth.service.js.map