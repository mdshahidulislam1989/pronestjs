import { BaseEntity } from './base.entity';
import { OrgTeam, User } from './index';
export declare class OrgTeamUser extends BaseEntity {
    id: number;
    team: OrgTeam;
    user: User;
}
