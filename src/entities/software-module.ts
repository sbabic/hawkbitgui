export interface SoftwareModule {
    id: number;
    name: string;
    description: string;
    version: string;
    type: string;
    typeName: string;
    vendor: string;
    encrypted: boolean;
    locked: boolean;
    deleted: boolean;
    _links: Record<string, string>;
    createdBy: string;
    createdAt: number;
    lastModifiedBy: string;
    lastModifiedAt: number;
}
