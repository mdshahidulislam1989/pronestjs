import { InitialWorkspaceCreateDto } from './dto/initial-workspace-create.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { WorkspaceCreateDto } from './dto/workspace-create.dto';
import { WorkspaceNameUpdateDto } from './dto/workspace-name-update.dto';
import { WorkspaceService } from './workspace.service';
export declare class WorkspaceController {
    private readonly workspaceService;
    constructor(workspaceService: WorkspaceService);
    setMyCurrentWorkspace(req: any, workspaceId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    createInitialAndSelect(req: any, initialWorkspaceCreateDto: InitialWorkspaceCreateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    orgNotPendingUsers(req: any): Promise<any>;
    selectedWorkspaceUsers(req: any): Promise<any[]>;
    create(req: any, workspaceCreateDto: WorkspaceCreateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateMembers(req: any, id: number, updateMembersDto: UpdateMembersDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateWorkspaceName(req: any, id: number, workspaceNameUpdateDto: WorkspaceNameUpdateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    myRelated(req: any): Promise<any>;
    workspaceDetails(id: number): Promise<any>;
    assignNewMembersInSelectedWorkspace(req: any, updateMembersDto: UpdateMembersDto): Promise<{
        success: boolean;
        message: string;
    }>;
    delete(req: any, id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
