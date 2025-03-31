export interface Target {
    createdBy: Date;
    createdAt: number;
    lastModifiedBy: string;
    lastModifiedAt: Date;
    name: string;
    description: string;
    controllerId: string;
    updateStatus: 'in_sync' | 'pending' | 'error' | string;
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
