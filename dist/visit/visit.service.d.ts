import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { Visit } from 'src/db';
import { NotificationService } from 'src/notification/notification.service';
import { VisitStates } from 'src/static/visit-states';
import { DataSource, QueryRunner } from 'typeorm';
import { InstantVisitDto } from './dto/instant-visit.dto';
import { SaveDto } from './dto/save.dto';
export declare class VisitService {
    private readonly dataSource;
    private readonly notificationService;
    constructor(dataSource: DataSource, notificationService: NotificationService);
    taskMyLastVisitCurrentState(authUser: IJwtAuthToken, taskId: number): Promise<any>;
    instantVisit(authUser: IJwtAuthToken, instantVisitDto: InstantVisitDto): Promise<{
        success: boolean;
        message: string;
    }>;
    visitIn(authUser: IJwtAuthToken, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    visitPause(authUser: IJwtAuthToken, visitId: number, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    visitResume(authUser: IJwtAuthToken, visitId: number, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    visitOut(authUser: IJwtAuthToken, visitId: number, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    taskVisits(taskId: number, stateId: 0 | 1 | 2 | 3 | 4): Promise<Visit[]>;
    isTaskCompleted(taskId: number): Promise<boolean>;
    isAnyVisitIsInProgress(userId: number, workspaceId: number): Promise<boolean>;
    isVisitIsInProgress(visitId: number): Promise<boolean>;
    isVisitCurrentStateIdMatched(visitId: number, stateIdToMatch: VisitStates): Promise<boolean>;
    updateLastVisitStateDuration(visitId: number, queryRunner: QueryRunner): Promise<void>;
    updateTaskTotalVisitDuration(taskId: number, queryRunner: QueryRunner): Promise<void>;
}
