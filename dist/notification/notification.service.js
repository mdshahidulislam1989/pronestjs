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
exports.NotificationService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const typeorm_1 = require("typeorm");
let NotificationService = class NotificationService {
    constructor(httpService, dataSource) {
        this.httpService = httpService;
        this.dataSource = dataSource;
    }
    async getMy(authUser) {
        const data = await this.dataSource.query(`
    SELECT
        n.id,
        n.title,
        n.body,
        n.createdAt,
        n.organizationId,
        n.senderId,
        su.name AS senderName,
        su.image AS senderImage
    FROM
        notifications n
    LEFT JOIN users su ON
        su.id = n.senderId
    WHERE
        n.receiverId = ${authUser.id} AND(
            n.organizationId = ${authUser.selectedWorkspace.organizationId} OR n.organizationId IS NULL
        )
    ORDER BY
        n.id
    DESC
    LIMIT 20
    `);
        return { count: data.length, data };
    }
    async sendNotification(userId, data) {
        try {
            let users = userId;
            let to = [];
            if (Array.isArray(userId)) {
                users = userId.length > 0 ? userId.map(u => `${u}`).join(', ') : null;
                await Promise.all(userId.map(async (id) => {
                    await this.dataSource.query(`
            INSERT INTO notifications(
              title,
              body,
              senderId,
              receiverId,
              workspaceId,
              organizationId    
            )
            VALUES(
              "${data.title}",
              "${data.body}",
              ${data.senderId},
              ${id},
              ${data.workspaceId},
              ${data.organizationId}
            )
              `);
                }));
            }
            else {
                await this.dataSource.query(`
        INSERT INTO notifications(
          title,
          body,
          senderId,
          receiverId,
          workspaceId,
          organizationId    
        )
        VALUES(
          "${data.title}",
          "${data.body}",
          ${data.senderId || null},
          ${userId},
          ${data.workspaceId || null},
          ${data.organizationId || null}
        )
        `);
            }
            const tokens = await this.dataSource.query(`
      SELECT ns.fcmToken FROM notification_settings ns WHERE ns.userId IN (${users}) AND ns.pushNotification=true AND ns.fcmToken IS NOT null
      `);
            to = tokens.map(({ fcmToken }) => fcmToken);
            if (to.length > 0) {
                const response = await this.httpService
                    .post(config_1.GlobalConfig.expoNotificationUrl, {
                    to: to,
                    title: data.title,
                    body: data.body,
                })
                    .toPromise();
                return response.data;
            }
        }
        catch (error) {
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        typeorm_1.DataSource])
], NotificationService);
//# sourceMappingURL=notification.service.js.map