import { InstantVisitDto } from './dto/instant-visit.dto';
import { SaveDto } from './dto/save.dto';
import { VisitService } from './visit.service';
export declare class VisitController {
    private readonly visitService;
    constructor(visitService: VisitService);
    taskMyLastVisitCurrentState(req: any, taskId: number): Promise<any>;
    instantVisit(req: any, instantVisitDto: InstantVisitDto): Promise<{
        success: boolean;
        message: string;
    }>;
    visitIn(req: any, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    visitPause(req: any, visitId: number, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    visitResume(req: any, visitId: number, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    visitOut(req: any, visitId: number, taskId: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    taskVisits(taskId: number, stateId: 0 | 1 | 2 | 3 | 4): Promise<import("../db").Visit[]>;
}
