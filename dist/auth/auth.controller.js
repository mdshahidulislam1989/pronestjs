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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth.guard");
const auth_service_1 = require("./auth.service");
const change_password_dto_1 = require("./dto/change-password.dto");
const forgot_password_update_dto_1 = require("./dto/forgot-password-update.dto");
const login_dto_1 = require("./dto/login.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const register_dto_1 = require("./dto/register.dto");
const update_notification_preferences_dto_1 = require("./dto/update-notification-preferences.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async verifySignupEmail(email) {
        return await this.authService.verifySignupEmail(email);
    }
    async verifyOtp(otp) {
        return await this.authService.verifyOtp(otp);
    }
    async register(registerDto) {
        return await this.authService.register(registerDto);
    }
    async login(loginDto) {
        return await this.authService.login(loginDto);
    }
    async forgotPassword(email) {
        return await this.authService.forgotPassword(email);
    }
    async forgotPasswordUpdate(forgotPasswordUpdateDto) {
        return await this.authService.forgotPasswordUpdate(forgotPasswordUpdateDto);
    }
    async changePassword(req, changePasswordDto) {
        return await this.authService.changePassword(req?.user, changePasswordDto);
    }
    async profile(req) {
        const profile = await this.authService.profile(req.user.id);
        delete profile.refreshToken;
        return profile;
    }
    async profileSimpleInfo(req) {
        return await this.authService.profileSimpleInfo(req?.user);
    }
    async updateProfile(req, updateProfileDto) {
        return await this.authService.updateProfile(req.user.id, updateProfileDto);
    }
    async updateProfilePic(req, image) {
        return await this.authService.updateProfilePic(req.user.id, image);
    }
    async updateFcmToken(req, fcmToken) {
        return await this.authService.updateFcmToken(req.user.id, fcmToken);
    }
    async deleteMyAccount(req) {
        return await this.authService.deleteMyAccount(req?.user?.id);
    }
    async myNotificationPreferences(req) {
        return await this.authService.myNotificationPreferences(req?.user);
    }
    async updateMyNotificationPreferences(req, updateNotificationPreferencesDto) {
        return await this.authService.updateMyNotificationPreferences(req?.user, updateNotificationPreferencesDto);
    }
    async refreshToken(refreshTokenDto) {
        return await this.authService.refreshToken(refreshTokenDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Get)('verify-signup-email'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifySignupEmail", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Get)('verify-otp'),
    __param(0, (0, common_1.Query)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Get)('forgot-password'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Put)('forgot-password-update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_update_dto_1.ForgotPasswordUpdateDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPasswordUpdate", null);
__decorate([
    (0, common_1.Put)('change-password'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)('profile-simple-info'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profileSimpleInfo", null);
__decorate([
    (0, common_1.Put)('update-profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('update-profile-pic'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('image')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfilePic", null);
__decorate([
    (0, common_1.Put)('update-fcm-token'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('fcm-token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateFcmToken", null);
__decorate([
    (0, common_1.Put)('delete-my-account'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteMyAccount", null);
__decorate([
    (0, common_1.Get)('my-notification-preferences'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "myNotificationPreferences", null);
__decorate([
    (0, common_1.Put)('update-my-notification-preferences'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_notification_preferences_dto_1.UpdateNotificationPreferencesDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateMyNotificationPreferences", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map