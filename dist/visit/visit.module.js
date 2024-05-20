"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitModule = void 0;
const common_1 = require("@nestjs/common");
const notification_module_1 = require("../notification/notification.module");
const visit_controller_1 = require("./visit.controller");
const visit_service_1 = require("./visit.service");
let VisitModule = class VisitModule {
};
exports.VisitModule = VisitModule;
exports.VisitModule = VisitModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        providers: [visit_service_1.VisitService],
        controllers: [visit_controller_1.VisitController],
    })
], VisitModule);
//# sourceMappingURL=visit.module.js.map