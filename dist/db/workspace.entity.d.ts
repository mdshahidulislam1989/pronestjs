import { BaseEntity } from './base.entity';
import { Notification } from './notification.entity';
import { Organization } from './organization.entity';
import { Task } from './task.entity';
import { User } from './user.entity';
import { Visit } from './visit.entity';
import { WorkspaceUser } from './workspace-user.entity';
export declare class Workspace extends BaseEntity {
    id: number;
    name: string;
    createdBy: User;
    updatedBy: User;
    organization: Organization;
    workspaceUsers: WorkspaceUser[];
    tasks: Task[];
    visits: Visit[];
    notifications: Notification[];
}
