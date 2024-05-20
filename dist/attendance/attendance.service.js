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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
const responses_1 = require("../utils/responses");
const typeorm_1 = require("typeorm");
let AttendanceService = class AttendanceService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async myAttendanceStatus(authUser) {
        const isAlreadyDayStarted = await this.isAlreadyDayStarted(authUser);
        return { isDayStarted: isAlreadyDayStarted ? true : false, attendanceInfo: isAlreadyDayStarted };
    }
    async dayStart(authUser, saveDto) {
        const isAlreadyDayStarted = await this.isAlreadyDayStarted(authUser);
        if (isAlreadyDayStarted)
            return (0, responses_1.FailedResponse)('Your have already started a day! Please end it first.');
        await this.dataSource.query(`
    INSERT INTO attendances(
        startLat,
        startLng,
        startAddress,
        userId,
        organizationId
    )
    VALUES(
      "${saveDto.lat}",
      "${saveDto.lng}",
      "${saveDto.address}",
      ${authUser.id},
      ${authUser.selectedWorkspace.organizationId}
    )
    `);
        return (0, responses_1.SuccessResponse)('Day started!');
    }
    async dayEnd(authUser, saveDto) {
        const isAlreadyDayStarted = await this.isAlreadyDayStarted(authUser);
        if (!isAlreadyDayStarted)
            return (0, responses_1.FailedResponse)('Your have not started a day yet!');
        await this.dataSource.query(`
    UPDATE
        attendances
    SET
        endLat = "${saveDto.lat}",
        endLng = "${saveDto.lng}",
        endAddress = "${saveDto.address}",
        endedAt = CURRENT_TIMESTAMP(),
        duration = TIMESTAMPDIFF(SECOND, createdAt, CURRENT_TIMESTAMP())
    WHERE
        id=${isAlreadyDayStarted.id}
    `);
        return (0, responses_1.SuccessResponse)('Day ended!');
    }
    async isAlreadyDayStarted(authUser) {
        return await this.dataSource
            .createQueryBuilder(db_1.Attendance, 'a')
            .where('a.userId=:userId', { userId: authUser.id })
            .andWhere('a.organizationId=:organizationId', { organizationId: authUser.selectedWorkspace.organizationId })
            .andWhere('a.endedAt IS NULL')
            .orderBy('a.id', 'DESC')
            .getOne();
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map