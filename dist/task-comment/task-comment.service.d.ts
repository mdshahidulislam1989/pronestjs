import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { TaskComment } from 'src/db';
import { DataSource } from 'typeorm';
import { SaveDto } from './dto/save.dto';
export declare class TaskCommentService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    add(authUser: IJwtAuthToken, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllByTaskId(taskId: number): Promise<TaskComment[]>;
}
