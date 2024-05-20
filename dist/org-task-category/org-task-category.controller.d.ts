import { SaveDto } from './dto/save.dto';
import { OrgTaskCategoryService } from './org-task-category.service';
export declare class OrgTaskCategoryController {
    private readonly orgTaskCategoryService;
    constructor(orgTaskCategoryService: OrgTaskCategoryService);
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
