export interface SoftwareModule {
    createdBy: string;
    createdAt: number;
    lastModifiedBy: string;
    lastModifiedAt: number;
    name: string;
    description: string;
    version: string;
    type: string;
    typeName: string;
    vendor: string;
    locked: boolean;
    deleted: boolean;
    encrypted: boolean;
    id: number;
}
