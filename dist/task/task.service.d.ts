import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { Task, TaskAttachment, TaskMember } from 'src/db';
import { NotificationService } from 'src/notification/notification.service';
import { TaskStatuses } from 'src/static/task-status';
import { DataSource } from 'typeorm';
import { SaveDto } from './dto/save.dto';
export declare class TaskService {
    private readonly dataSource;
    private readonly notificationService;
    constructor(dataSource: DataSource, notificationService: NotificationService);
    todaysTasks(authUser: IJwtAuthToken): Promise<{
        today: any;
        tasks: Task[];
    }>;
    tasks(authUser: IJwtAuthToken, status: TaskStatuses): Promise<Task[]>;
    create(authUser: IJwtAuthToken, saveDto: SaveDto): Promise<{
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
        category: import("src/db").OrgTaskCategory;
        type: import("src/db").OrgTaskType;
        createdBy: import("src/db").User;
        updatedBy: import("src/db").User;
        workspace: import("src/db").Workspace;
        organization: import("src/db").Organization;
        attachments: TaskAttachment[];
        taskMembers: TaskMember[];
        comments: import("src/db").TaskComment[];
        visits: import("src/db").Visit[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, authUser: IJwtAuthToken, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    statusUpdate(id: number, authUser: IJwtAuthToken, status: TaskStatuses): Promise<{
        success: boolean;
        message: string;
    }>;
    delete(authUser: IJwtAuthToken, id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
