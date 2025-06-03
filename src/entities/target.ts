export const TargetStatus = {
  IN_SYNC: 'in_sync',
  PENDING: 'pending',
  ERROR: 'error',
  REGISTERED: 'registered',
  UNKNOWN: 'unknown',
};

export type TargetStatus = keyof typeof TargetStatus;

export interface Target {
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
  name: string;
  description: string;
  controllerId: string;
  updateStatus: TargetStatus;
  status?: string;
  securityToken: string;
  requestAttributes: boolean;

  // Optional fields that aren't in your actual data
  lastControllerRequestAt?: number;
  installedAt?: number;
  ipAddress?: string;
  address?: string;
  pollStatus?: {
    lastRequestAt: number;
    nextExpectedRequestAt: number;
    overdue: boolean;
  };
  targetType?: number;
  targetTypeName?: string;
  autoConfirmActive?: boolean;
}

export function isTargetStatus(value: any): value is TargetStatus {
  return typeof value === 'string' && Object.values(TargetStatus).includes(value);
}

export function isTarget(obj: any): obj is Target {
  if (typeof obj !== 'object' || obj === null) {
    console.log('Invalid: not an object or is null');
    return false;
  }

  console.log('Validating Target object:', obj);
  return (
    typeof obj.createdBy === 'string' &&
    typeof obj.createdAt === 'number' &&
    typeof obj.lastModifiedBy === 'string' &&
    typeof obj.lastModifiedAt === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.controllerId === 'string' &&
    isTargetStatus(obj.updateStatus) &&
    typeof obj.securityToken === 'string' &&
    typeof obj.requestAttributes === 'boolean' &&
    (obj.status === undefined || typeof obj.status === 'string') &&
    (obj.lastControllerRequestAt === undefined || typeof obj.lastControllerRequestAt === 'number') &&
    (obj.installedAt === undefined || typeof obj.installedAt === 'number') &&
    (obj.ipAddress === undefined || typeof obj.ipAddress === 'string') &&
    (obj.address === undefined || typeof obj.address === 'string') &&
    (obj.pollStatus === undefined ||
      (typeof obj.pollStatus === 'object' &&
        obj.pollStatus !== null &&
        typeof obj.pollStatus.lastRequestAt === 'number' &&
        typeof obj.pollStatus.nextExpectedRequestAt === 'number' &&
        typeof obj.pollStatus.overdue === 'boolean')) &&
    (obj.targetType === undefined || typeof obj.targetType === 'number') &&
    (obj.targetTypeName === undefined || typeof obj.targetTypeName === 'string') &&
    (obj.autoConfirmActive === undefined || typeof obj.autoConfirmActive === 'boolean')
  );
}
