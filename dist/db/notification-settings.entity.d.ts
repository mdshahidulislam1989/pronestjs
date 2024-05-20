import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class NotificationSettings extends BaseEntity {
    id: number;
    fcmToken: string;
    pushNotification: boolean;
    user: User;
}
