import { SaveDto } from './dto/save.dto';
import { TaskCommentService } from './task-comment.service';
export declare class TaskCommentController {
    private readonly taskCommentService;
    constructor(taskCommentService: TaskCommentService);
    add(req: any, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllByTaskId(taskId: number): Promise<import("../db").TaskComment[]>;
}
