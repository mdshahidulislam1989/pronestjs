import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';
import { Task } from './task.entity';
import { User } from './user.entity';
export declare class OrgTaskType extends BaseEntity {
    id: number;
    name: string;
    createdBy: User;
    updatedBy: User;
    organization: Organization;
    tasks: Task[];
}
