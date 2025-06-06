export const RolloutStatus = {
  creating: 'creating',
  waiting_for_approval: 'waiting_for_approval',
  approval_denied: 'approval_denied',
  ready: 'ready',
  paused: 'paused',
  starting: 'starting',
  stopped: 'stopped',
  stopping: 'stopping',
  running: 'running',
  finished: 'finished',
  deleting: 'deleting',
  deleted: 'deleted',
} as const;
export type RolloutStatus = (typeof RolloutStatus)[keyof typeof RolloutStatus];

export const TotalTargetCountStatus = {
  running: 'running',
  notstarted: 'notstarted',
  scheduled: 'scheduled',
  cancelled: 'cancelled',
  finished: 'finished',
  error: 'error',
} as const;
export type TotalTargetCountStatus = (typeof TotalTargetCountStatus)[keyof typeof TotalTargetCountStatus];

export const RolloutTypes = {
  SOFT: 'soft',
  FORCED: 'forced',
  TIME_FORCED: 'timeforced',
  DOWNLOAD_ONLY: 'downloadonly',
} as const;
export type RolloutType = (typeof RolloutTypes)[keyof typeof RolloutTypes];

export const StartType = {
  MANUAL: 'MANUAL',
  AUTO: 'AUTO',
  SCHEDULED: 'SCHEDULED',
} as const;

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

export interface RolloutGroup {
  id: number;
  name: string;
  status: RolloutStatus;
  totalTargetsPerStatus: Record<TotalTargetCountStatus, number>;
  errorThreshold: number;
  triggerThreshold: number;
  createdAt: number;
  createdBy: string;
  lastModifiedAt: number;
  lastModifiedBy: string;
}
