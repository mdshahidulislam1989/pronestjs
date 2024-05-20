import { BaseEntity } from './base.entity';
import { Task } from './task.entity';
import { User } from './user.entity';
export declare class TaskComment extends BaseEntity {
    id: number;
    comment: string;
    task: Task;
    createdBy: User;
}
