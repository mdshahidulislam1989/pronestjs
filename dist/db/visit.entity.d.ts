import { VisitStates } from 'src/static/visit-states';
import { BaseEntity } from './base.entity';
import { OrgTeam } from './org-team.entity';
import { Organization } from './organization.entity';
import { Task } from './task.entity';
import { User } from './user.entity';
import { VisitState } from './visit-state.entity';
import { Workspace } from './workspace.entity';
export declare class Visit extends BaseEntity {
    endedAt: Date;
    id: number;
    duration: number;
    totalPauseTime: number;
    currentStateId: VisitStates;
    states: VisitState[];
    user: User;
    task: Task;
    workspace: Workspace;
    organization: Organization;
    team: OrgTeam;
}
