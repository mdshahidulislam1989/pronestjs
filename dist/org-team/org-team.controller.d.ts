import { CreateDto } from './dto/create.dto';
import { MembersDto } from './dto/members.dto';
import { NameDto } from './dto/name.dto';
import { OrgTeamService } from './org-team.service';
export declare class OrgTeamController {
    private readonly orgTeamService;
    constructor(orgTeamService: OrgTeamService);
    getAllFromSelectedOrg(req: any): Promise<any>;
    createInSelectedOrg(req: any, createDto: CreateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateName(req: any, id: number, nameDto: NameDto): Promise<{
        success: boolean;
        message: string;
    }>;
    members(id: number): Promise<any[]>;
    updateMembers(id: number, membersDto: MembersDto): Promise<{
        success: boolean;
        message: string;
    }>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
