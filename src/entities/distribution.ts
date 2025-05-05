import { SoftwareModule } from '@/entities/software-module';

export interface Distribution {
    id: number;
    name: string;
    description: string;
    version: string;
    type: string;
    typeName: string;
    complete: boolean;
    locked: boolean;
    deleted: boolean;
    valid: boolean;
    requiredMigrationStep: boolean;
    modules: SoftwareModule[];
    createdBy: string;
    createdAt: number;
    lastModifiedBy: string;
    lastModifiedAt: number;
}
