import { TaskStatuses } from 'src/static/task-status';
import { BaseEntity } from './base.entity';
import { OrgTaskCategory } from './org-task-category.entity';
import { OrgTaskType } from './org-task-type.entity';
import { Organization } from './organization.entity';
import { TaskAttachment } from './task-attachment.entity';
import { TaskComment } from './task-comment.entity';
import { TaskMember } from './task-member.entity';
import { User } from './user.entity';
import { Visit } from './visit.entity';
import { Workspace } from './workspace.entity';
export declare class Task extends BaseEntity {
    id: number;
    name: string;
    description: string;
    lat: string;
    lng: string;
    address: string;
    isMultipleVisit: boolean;
    expectedVisitNo: number;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    contactName: string;
    contactCountryCode: string;
    contactNo: string;
    contactAddress: string;
    status: TaskStatuses;
    totalVisit: number;
    totalVisitDuration: number;
    isInstantVisit: boolean;
    category: OrgTaskCategory;
    type: OrgTaskType;
    createdBy: User;
    updatedBy: User;
    workspace: Workspace;
    organization: Organization;
    attachments: TaskAttachment[];
    taskMembers: TaskMember[];
    comments: TaskComment[];
    visits: Visit[];
}
