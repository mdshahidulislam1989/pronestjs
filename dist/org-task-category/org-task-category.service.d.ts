import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { DataSource } from 'typeorm';
import { SaveDto } from './dto/save.dto';
export declare class OrgTaskCategoryService {
    private dataSource;
    constructor(dataSource: DataSource);
    getSelectedWorkspaceOrgTaskCategories(authUser: IJwtAuthToken): Promise<any>;
    createInSelectedOrg(authUser: IJwtAuthToken, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateInSelectedOrg(authUser: IJwtAuthToken, id: number, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
