import { UserRoles } from 'src/static/user-roles';
import { BaseEntity } from './base.entity';
import { User } from './index';
import { Workspace } from './workspace.entity';
export declare class WorkspaceUser extends BaseEntity {
    id: number;
    roleId: UserRoles;
    isSelected: boolean;
    workspace: Workspace;
    user: User;
}
