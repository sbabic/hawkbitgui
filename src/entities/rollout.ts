export const Action = {
  NEXTGROUP: 'NEXTGROUP',
  PAUSE: 'PAUSE',
} as const;
export type Action = (typeof Action)[keyof typeof Action];

export const Condition = {
  THRESHOLD: 'THRESHOLD',
} as const;
export type Condition = (typeof Condition)[keyof typeof Condition];

export type SuccessCondition = {
  condition: 'THRESHOLD';
  expression: string;
};

export type SuccessAction = {
  action: 'NEXTGROUP';
  expression: string;
};

export type ErrorCondition = {
  condition: 'THRESHOLD';
  expression: string;
};

export type ErrorAction = {
  action: 'PAUSE';
  expression: string;
};

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

export interface RolloutDeployGroup {
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
  id: number;
  name: string;
  description: string;
  successCondition: SuccessCondition;
  successAction: SuccessAction;
  errorCondition: ErrorCondition;
  errorAction: ErrorAction;
  targetFilterQuery: string;
  targetPercentage: number;
  confirmationRequired: boolean;
  status: RolloutStatus;
  totalTargets: number;
  totalTargetsPerStatus: Record<TotalTargetCountStatus, number>;
}

export interface DeployGroupTarget {
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
  name: string;
  description: string;
  controllerId: string;
  updateStatus: string;
  lastControllerRequestAt: number;
  installedAt: number;
  ipAddress: string;
  address: string;
  pollStatus: {
    lastRequestAt: number;
    nextExpectedRequestAt: number;
    overdue: boolean;
  };
  securityToken: string;
  requestAttributes: boolean;
  targetType: number;
  targetTypeName: string;
  autoConfirmActive: boolean;
}
