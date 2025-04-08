import { SoftwareModule } from '@/entities/software-module';

export interface Distribution {
    createdBy: string;
    createdAt: number;
    lastModifiedBy: string;
    lastModifiedAt: number;
    name: string;
    description: string;
    version: string;
    modules: SoftwareModule[];
    requiredMigrationStep: boolean;
    type: string;
    typeName: string;
    complete: boolean;
    deleted: boolean;
    valid: boolean;
    id: number;
}
