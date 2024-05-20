import { AssignWorkspacesDto } from './dto/assign-workspaces.dto';
import { OrganizationService } from './organization.service';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    myOrgInfo(req: any): Promise<any>;
    teamSizeList(): Promise<{
        id: number;
        icon: string;
        title: string;
        fromUser: number;
        toUser: number;
    }[]>;
    updateMyOrgTeamSize(req: any, teamSizeId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    updateMyOrgName(req: any, name: string): Promise<{
        success: boolean;
        message: string;
    }>;
    inviteUserInMyOrg(req: any, email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    myOrgUsers(req: any): Promise<{
        slots: {
            userLimit: any;
            added: any;
            free: number;
        };
        users: any;
    }>;
    removeUserFromMyOrg(req: any, uId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    myPendingInvitations(req: any): Promise<any[]>;
    acceptInvitation(ouId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    rejectInvitation(ouId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    assignedWorkspacesForUserInMyOrg(req: any, uId: number): Promise<any>;
    myOrgWorkspaces(req: any): Promise<import("../db").Workspace[]>;
    updateWorkspacesForUserInMyOrg(req: any, assignWorkspacesDto: AssignWorkspacesDto, uId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    myRelatedOrgs(req: any): Promise<any>;
    myRelatedWorkspacesByOrg(req: any, oId: number): Promise<any>;
}
