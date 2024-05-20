"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const db_1 = require("../db");
const check_selected_workspace_middleware_1 = require("../middleware/check-selected-workspace.middleware");
const notification_module_1 = require("../notification/notification.module");
const workspace_controller_1 = require("./workspace.controller");
const workspace_service_1 = require("./workspace.service");
let WorkspaceModule = class WorkspaceModule {
    configure(consumer) {
        consumer
            .apply(check_selected_workspace_middleware_1.CheckSelectedWorkspace)
            .exclude({ path: '/', method: common_1.RequestMethod.GET }, { path: '/auth/(.*)', method: common_1.RequestMethod.ALL }, { path: '/workspace/create-initial-and-select', method: common_1.RequestMethod.POST }, { path: '/workspace/my-related', method: common_1.RequestMethod.GET }, { path: '/workspace/set-my-current-workspace', method: common_1.RequestMethod.PUT }, { path: '/organization/my-related-orgs', method: common_1.RequestMethod.GET }, { path: '/organization/my-related-workspaces-by-org/:oId', method: common_1.RequestMethod.GET }, { path: '/organization/invite-user-in-my-org', method: common_1.RequestMethod.GET }, { path: '/organization/my-pending-invitations', method: common_1.RequestMethod.GET }, { path: '/organization/accept-invitation/:ouId', method: common_1.RequestMethod.PUT }, { path: '/organization/reject-invitation/:ouId', method: common_1.RequestMethod.DELETE }, { path: '/organization/my-org-users', method: common_1.RequestMethod.GET }, { path: '/organization/remove-user-from-my-org/:uId', method: common_1.RequestMethod.DELETE }, { path: '/organization/my-org-workspaces', method: common_1.RequestMethod.GET }, { path: '/organization/update-workspaces-for-user-in-my-org/:uId', method: common_1.RequestMethod.PUT }, { path: '/organization/update-my-org-name', method: common_1.RequestMethod.PUT })
            .forRoutes('*');
    }
};
exports.WorkspaceModule = WorkspaceModule;
exports.WorkspaceModule = WorkspaceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([db_1.User, db_1.Organization, db_1.Workspace, db_1.WorkspaceUser]), auth_module_1.AuthModule, notification_module_1.NotificationModule],
        controllers: [workspace_controller_1.WorkspaceController],
        providers: [workspace_service_1.WorkspaceService],
    })
], WorkspaceModule);
//# sourceMappingURL=workspace.module.js.map