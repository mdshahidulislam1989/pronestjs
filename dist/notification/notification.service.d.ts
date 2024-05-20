import { HttpService } from '@nestjs/axios';
import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { DataSource } from 'typeorm';
export declare class NotificationService {
    private httpService;
    private dataSource;
    constructor(httpService: HttpService, dataSource: DataSource);
    getMy(authUser: IJwtAuthToken): Promise<{
        count: any;
        data: any;
    }>;
    sendNotification(userId: number | number[] | string | string[], data: {
        senderId?: number;
        organizationId?: number;
        workspaceId?: number;
        title: string;
        body: string;
    }): Promise<any>;
}
