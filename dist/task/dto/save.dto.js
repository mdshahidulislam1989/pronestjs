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
exports.SaveDto = void 0;
const class_validator_1 = require("class-validator");
const custom_class_validators_1 = require("../../utils/custom-class-validators");
class SaveDto {
}
exports.SaveDto = SaveDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveDto.prototype, "lng", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SaveDto.prototype, "isMultipleVisit", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SaveDto.prototype, "expectedVisitNo", void 0);
__decorate([
    (0, custom_class_validators_1.IsYYYYMMDD)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SaveDto.prototype, "startDate", void 0);
__decorate([
    (0, custom_class_validators_1.IsYYYYMMDD)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SaveDto.prototype, "endDate", void 0);
__decorate([
    (0, custom_class_validators_1.IsHHMMSS)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SaveDto.prototype, "startTime", void 0);
__decorate([
    (0, custom_class_validators_1.IsHHMMSS)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SaveDto.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveDto.prototype, "contactName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveDto.prototype, "contactCountryCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveDto.prototype, "contactNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveDto.prototype, "contactAddress", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SaveDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SaveDto.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SaveDto.prototype, "teamId", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], SaveDto.prototype, "userIds", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SaveDto.prototype, "attachments", void 0);
//# sourceMappingURL=save.dto.js.map