import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { Task } from 'src/db';
import { TaskStatuses } from 'src/static/task-status';
import { DataSource } from 'typeorm';
export declare class MyPanelService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getVisitsBy(authUser: IJwtAuthToken, all: boolean, startedOrResumed: boolean, paused: boolean, ended: boolean): Promise<any[]>;
    allTasksStatusCount(authUser: IJwtAuthToken): Promise<any>;
    allVisitsStatusCount(authUser: IJwtAuthToken): Promise<any>;
    lastTeamTasksByLimit(authUser: IJwtAuthToken, limit: number | null): Promise<any[]>;
    recentTasks(authUser: IJwtAuthToken, status: TaskStatuses | 0, isToday: boolean): Promise<Task[]>;
}
