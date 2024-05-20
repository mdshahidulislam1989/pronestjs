import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { DataSource } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { MembersDto } from './dto/members.dto';
import { NameDto } from './dto/name.dto';
export declare class OrgTeamService {
    private dataSource;
    constructor(dataSource: DataSource);
    getAllFromSelectedOrg(authUser: IJwtAuthToken): Promise<any>;
    createInSelectedOrg(authUser: IJwtAuthToken, createDto: CreateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateName(authUser: IJwtAuthToken, id: number, nameDto: NameDto): Promise<{
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
