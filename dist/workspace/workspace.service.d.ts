import { AuthService } from 'src/auth/auth.service';
import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { Organization, User, Workspace, WorkspaceUser } from 'src/db';
import { NotificationService } from 'src/notification/notification.service';
import { DataSource, Repository } from 'typeorm';
import { InitialWorkspaceCreateDto } from './dto/initial-workspace-create.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { WorkspaceCreateDto } from './dto/workspace-create.dto';
import { WorkspaceNameUpdateDto } from './dto/workspace-name-update.dto';
export declare class WorkspaceService {
    private userRepository;
    private orgRepository;
    private workspaceRepository;
    private workspaceUserRepository;
    private dataSource;
    private notificationService;
    private readonly authService;
    constructor(userRepository: Repository<User>, orgRepository: Repository<Organization>, workspaceRepository: Repository<Workspace>, workspaceUserRepository: Repository<WorkspaceUser>, dataSource: DataSource, notificationService: NotificationService, authService: AuthService);
    setMyCurrentWorkspace(user: IJwtAuthToken, workspaceId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    createInitialAndSelect(user: IJwtAuthToken, initialWorkspaceCreateDto: InitialWorkspaceCreateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    orgNotPendingUsers(authUser: IJwtAuthToken): Promise<any>;
    selectedWorkspaceUsers(authUser: IJwtAuthToken): Promise<any[]>;
    create(user: IJwtAuthToken, workspaceCreateDto: WorkspaceCreateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateMembers(user: IJwtAuthToken, id: number, updateMembersDto: UpdateMembersDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateWorkspaceName(user: IJwtAuthToken, id: number, workspaceNameUpdateDto: WorkspaceNameUpdateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    myRelated(authUser: IJwtAuthToken): Promise<any>;
    workspaceDetails(id: number): Promise<any>;
    assignNewMembersInSelectedWorkspace(authUser: IJwtAuthToken, updateMembersDto: UpdateMembersDto): Promise<{
        success: boolean;
        message: string;
    }>;
    delete(authUser: IJwtAuthToken, id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
