"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyPanelModule = void 0;
const common_1 = require("@nestjs/common");
const my_panel_service_1 = require("./my-panel.service");
const my_panel_controller_1 = require("./my-panel.controller");
let MyPanelModule = class MyPanelModule {
};
exports.MyPanelModule = MyPanelModule;
exports.MyPanelModule = MyPanelModule = __decorate([
    (0, common_1.Module)({
        providers: [my_panel_service_1.MyPanelService],
        controllers: [my_panel_controller_1.MyPanelController]
    })
], MyPanelModule);
//# sourceMappingURL=my-panel.module.js.map