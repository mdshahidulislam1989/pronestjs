import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { VisitState } from './visit-state.entity';
export declare class VisitAttachment extends BaseEntity {
    id: number;
    name: string;
    visitState: VisitState;
    createdBy: User;
}
