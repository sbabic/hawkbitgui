export interface Target {
    name: string;
    controllerId: string;
    description?: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
}

export const generateMockData = (count: number): Target[] => {
    return Array.from({ length: count }, (_, i) => ({
        name: `controlhaus-64:CF:da${(i % 6) + 1}`,
        controllerId: `controller-${i + 1}`,
        description: `Target description ${i + 1}`,
        createdBy: `user${(i % 3) + 1}`,
        createdDate: new Date(),
        modifiedBy: `user${(i % 3) + 1}`,
        modifiedDate: new Date(),
    }));
};
