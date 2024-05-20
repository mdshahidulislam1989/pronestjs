import { TaskStatuses } from 'src/static/task-status';
import { MyPanelService } from './my-panel.service';
export declare class MyPanelController {
    private readonly myPanelService;
    constructor(myPanelService: MyPanelService);
    getVisitsBy(req: any, all: boolean, startedOrResumed: boolean, paused: boolean, ended: boolean): Promise<any[]>;
    allTasksStatusCount(req: any): Promise<any>;
    allVisitsStatusCount(req: any): Promise<any>;
    lastTeamTasksByLimit(req: any, limit: number | null): Promise<any[]>;
    recentTasks(req: any, status: TaskStatuses | 0, isToday: boolean): Promise<import("../db").Task[]>;
}
