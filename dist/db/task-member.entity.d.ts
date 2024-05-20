import { BaseEntity } from './base.entity';
import { OrgTeam, Task, User } from './index';
export declare class TaskMember extends BaseEntity {
    id: number;
    user: User;
    task: Task;
    addedBy: User;
    team: OrgTeam;
}
