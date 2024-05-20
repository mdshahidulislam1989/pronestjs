import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';
import { User } from './user.entity';
import { Workspace } from './workspace.entity';
export declare class Notification extends BaseEntity {
    id: number;
    title: string;
    body: string;
    sender: User;
    receiver: User;
    workspace: Workspace;
    organization: Organization;
}
