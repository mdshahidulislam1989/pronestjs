import { BaseEntity } from './base.entity';
import { Task } from './task.entity';
import { User } from './user.entity';
export declare class TaskAttachment extends BaseEntity {
    id: number;
    name: string;
    task: Task;
    createdBy: User;
}
