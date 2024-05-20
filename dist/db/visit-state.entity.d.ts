import { VisitStates } from 'src/static/visit-states';
import { BaseEntity } from './base.entity';
import { VisitAttachment } from './visit-attachment.entity';
import { Visit } from './visit.entity';
export declare class VisitState extends BaseEntity {
    id: number;
    stateId: VisitStates;
    lat: string;
    duration: number;
    lng: string;
    address: string;
    comment: string;
    visit: Visit;
    attachments: VisitAttachment[];
}
