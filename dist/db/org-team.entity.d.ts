import { BaseEntity } from './base.entity';
import { OrgTeamUser } from './org-team-user.entity';
import { Organization } from './organization.entity';
import { TaskMember } from './task-member.entity';
import { Visit } from './visit.entity';
export declare class OrgTeam extends BaseEntity {
    id: number;
    name: string;
    organization: Organization;
    orgTeamUsers: OrgTeamUser[];
    assignedTasks: TaskMember[];
    visits: Visit[];
}
