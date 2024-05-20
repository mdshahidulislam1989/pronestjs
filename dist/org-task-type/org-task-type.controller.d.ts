import { SaveDto } from './dto/save.dto';
import { OrgTaskTypeService } from './org-task-type.service';
export declare class OrgTaskTypeController {
    private readonly orgTaskTypeService;
    constructor(orgTaskTypeService: OrgTaskTypeService);
    getSelectedWorkspaceOrgTaskTypes(req: any): Promise<any>;
    createInSelectedOrg(req: any, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateInSelectedOrg(req: any, id: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
