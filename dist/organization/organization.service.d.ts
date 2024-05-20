import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { Organization, OrganizationUser, User, Workspace } from 'src/db';
import { NotificationService } from 'src/notification/notification.service';
import { DataSource, Repository } from 'typeorm';
import { AssignWorkspacesDto } from './dto/assign-workspaces.dto';
export declare class OrganizationService {
    private organizationRepository;
    private organizationUserRepository;
    private userRepository;
    private dataSource;
    private notificationService;
    constructor(organizationRepository: Repository<Organization>, organizationUserRepository: Repository<OrganizationUser>, userRepository: Repository<User>, dataSource: DataSource, notificationService: NotificationService);
    myOrgInfo(userId: number): Promise<any>;
    updateMyOrgTeamSize(userId: number, teamSizeId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    updateMyOrgName(userId: number, name: string): Promise<{
        success: boolean;
        message: string;
    }>;
    inviteUserInMyOrg(authUser: IJwtAuthToken, email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    myOrgUsers(authUser: IJwtAuthToken): Promise<{
        slots: {
            userLimit: any;
            added: any;
            free: number;
        };
        users: any;
    }>;
    removeUserFromMyOrg(authUser: IJwtAuthToken, uId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    myPendingInvitations(authUser: IJwtAuthToken): Promise<any[]>;
    acceptInvitation(ouId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    rejectInvitation(ouId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    assignedWorkspacesForUserInMyOrg(authUser: IJwtAuthToken, uId: number): Promise<any>;
    myOrgWorkspaces(authUser: IJwtAuthToken): Promise<Workspace[]>;
    updateWorkspacesForUserInMyOrg(authUser: IJwtAuthToken, assignWorkspacesDto: AssignWorkspacesDto, uId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    myRelatedOrgs(authUser: IJwtAuthToken): Promise<any>;
    myRelatedWorkspacesByOrg(authUser: IJwtAuthToken, oId: number): Promise<any>;
    getOrgUserSlots(organizationId: number): Promise<{
        userLimit: any;
        added: any;
        free: number;
    }>;
}
