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
