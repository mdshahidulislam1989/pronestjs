import { TaskStatuses } from 'src/static/task-status';
import { SaveDto } from './dto/save.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    todaysTasks(req: any): Promise<{
        today: any;
        tasks: import("../db").Task[];
    }>;
    tasks(req: any, status: TaskStatuses): Promise<import("../db").Task[]>;
    create(req: any, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(id: number): Promise<{
        team: {
            id: any;
            name: any;
        };
        teamUsers: any[];
        assignedUsers: any[];
        id: number;
        name: string;
        description: string;
        lat: string;
        lng: string;
        address: string;
        isMultipleVisit: boolean;
        expectedVisitNo: number;
        startDate: Date;
        endDate: Date;
        startTime: Date;
        endTime: Date;
        contactName: string;
        contactCountryCode: string;
        contactNo: string;
        contactAddress: string;
        status: TaskStatuses;
        totalVisit: number;
        totalVisitDuration: number;
        isInstantVisit: boolean;
        category: import("../db").OrgTaskCategory;
        type: import("../db").OrgTaskType;
        createdBy: import("../db").User;
        updatedBy: import("../db").User;
        workspace: import("../db").Workspace;
        organization: import("../db").Organization;
        attachments: import("../db").TaskAttachment[];
        taskMembers: import("../db").TaskMember[];
        comments: import("../db").TaskComment[];
        visits: import("../db").Visit[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, req: any, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    statusUpdate(id: number, req: any, status: TaskStatuses): Promise<{
        success: boolean;
        message: string;
    }>;
    delete(req: any, id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
