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
exports.CheckSelectedWorkspace = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config");
const db_1 = require("../db");
const responses_1 = require("../utils/responses");
const typeorm_1 = require("typeorm");
let CheckSelectedWorkspace = class CheckSelectedWorkspace {
    constructor(jwtService, dataSource) {
        this.jwtService = jwtService;
        this.dataSource = dataSource;
    }
    async use(request, response, next) {
        const isValidate = await this.validateSelectedWorkspaceFromToken(request);
        if (isValidate)
            next();
        else
            response.send((0, responses_1.FailedResponse)('No selected project or role changed! Please select a project first.', {
                noDefaultWorkspaceError: true,
            }));
    }
    async validateSelectedWorkspaceFromToken(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if (type !== 'Bearer')
            return false;
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: config_1.GlobalConfig.jwtAccessTokenSecret,
            });
            if (!payload || !payload.selectedWorkspace)
                return false;
            const workspaceUser = await this.dataSource
                .createQueryBuilder(db_1.WorkspaceUser, 'wu')
                .where('workspaceId = :workspaceId', { workspaceId: payload.selectedWorkspace.workspaceId })
                .andWhere('userId = :userId', { userId: payload.id })
                .getOne();
            if (!workspaceUser?.isSelected || workspaceUser?.roleId != payload?.selectedWorkspace?.roleId)
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.CheckSelectedWorkspace = CheckSelectedWorkspace;
exports.CheckSelectedWorkspace = CheckSelectedWorkspace = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_1.DataSource])
], CheckSelectedWorkspace);
//# sourceMappingURL=check-selected-workspace.middleware.js.map