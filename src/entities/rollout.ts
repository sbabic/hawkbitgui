import { TargetStatus } from './target';

export interface Rollout {
    name: string;
    distributionSet: string;
    status: TargetStatus;
    detailStatus?: string;
    groupsCount: number;
    targetsCount: number;
}
