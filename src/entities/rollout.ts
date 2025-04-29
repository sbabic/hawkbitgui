export const RolloutStatus = {
    CREATING: 'CREATING',
    WAITING_FOR_APPROVAL: 'WAITING_FOR_APPROVAL',
    APPROVAL_DENIED: 'APPROVAL_DENIED',
    READY: 'READY',
    PAUSED: 'PAUSED',
    STARTING: 'STARTING',
    STOPPED: 'STOPPED',
    STOPPING: 'STOPPING',
    RUNNING: 'RUNNING',
    FINISHED: 'FINISHED',
    DELETING: 'DELETING',
    DELETED: 'DELETED',
} as const;
export type RolloutStatus = (typeof RolloutStatus)[keyof typeof RolloutStatus];

export const TotalTargetCountStatus = {
    RUNNING: 'running',
    NOT_STARTED: 'notstarted',
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled',
    FINISHED: 'finished',
    ERROR: 'error',
} as const;
export type TotalTargetCountStatus = (typeof TotalTargetCountStatus)[keyof typeof TotalTargetCountStatus];

export const RolloutTypes = {
    SOFT: 'soft',
    FORCED: 'forced',
    TIME_FORCED: 'timeforced',
    DOWNLOAD_ONLY: 'downloadonly',
} as const;
export type RolloutType = (typeof RolloutTypes)[keyof typeof RolloutTypes];

export interface Rollout {
    id: number;
    name: string;
    description: string;
    targetFilterQuery: string;
    distributionSetId: number;
    type: RolloutType;
    status: RolloutStatus;
    totalTargets: number;
    totalTargetsPerStatus?: Record<TotalTargetCountStatus, number>;
    totalGroups: number;
    startAt: number;
    forcetime: number;
    deleted: boolean;
    createdBy: string;
    createdAt: number;
    lastModifiedBy: string;
    lastModifiedAt: number;
    _links: RolloutLinks;
}

export interface RolloutLinks {
    start: {
        href: string;
    };
    pause: {
        href: string;
    };
    resume: {
        href: string;
    };
    triggerNextGroup: {
        href: string;
    };
    approve: {
        href: string;
    };
    deny: {
        href: string;
    };
    groups: {
        href: string;
    };
    distributionset: {
        href: string;
        name: string;
    };
    self: {
        href: string;
    };
}
