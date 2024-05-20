import { BaseEntity } from './base.entity';
import { Organization, User } from './index';
export declare class OrganizationUser extends BaseEntity {
    id: number;
    isPending: boolean;
    user: User;
    organization: Organization;
}
