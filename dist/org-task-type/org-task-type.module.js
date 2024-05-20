"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgTaskTypeModule = void 0;
const common_1 = require("@nestjs/common");
const org_task_type_service_1 = require("./org-task-type.service");
const org_task_type_controller_1 = require("./org-task-type.controller");
let OrgTaskTypeModule = class OrgTaskTypeModule {
};
exports.OrgTaskTypeModule = OrgTaskTypeModule;
exports.OrgTaskTypeModule = OrgTaskTypeModule = __decorate([
    (0, common_1.Module)({
        providers: [org_task_type_service_1.OrgTaskTypeService],
        controllers: [org_task_type_controller_1.OrgTaskTypeController]
    })
], OrgTaskTypeModule);
//# sourceMappingURL=org-task-type.module.js.map