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
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
let MailService = class MailService {
    constructor(mailerService, httpService) {
        this.mailerService = mailerService;
        this.httpService = httpService;
    }
    async sendFromAzure(action, data) {
        try {
            const response = await this.httpService.post(config_1.GlobalConfig.azureMailUrl + action, data).toPromise();
            return response.data;
        }
        catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
    async sendOtp(to, otp) {
        if (!to)
            return;
        return await this.sendFromAzure('/send-otp', {
            appId: config_1.GlobalConfig.azureAppId,
            email: to,
            otp: otp,
        });
    }
    async registrationWelcome(to, name) {
        if (!to)
            return;
        await this.sendFromAzure('/send-welcome', {
            appId: config_1.GlobalConfig.azureAppId,
            email: to,
            name: name,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        axios_1.HttpService])
], MailService);
//# sourceMappingURL=mail.service.js.map