import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';
import { User } from './user.entity';
export declare class Attendance extends BaseEntity {
    id: number;
    startLat: string;
    startLng: string;
    startAddress: string;
    endLat: string;
    endLng: string;
    endAddress: string;
    endedAt: Date;
    duration: number;
    user: User;
    organization: Organization;
}
