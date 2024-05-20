import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getMy(req: any): Promise<{
        count: any;
        data: any;
    }>;
}
