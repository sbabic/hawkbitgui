import { SoftwareModuleArtifact } from '@/entities/software-module-artifact';

export interface UploadArtifactInput {
    softwareModuleId: number;
    file: File | Blob;
    filename: string;
}

export type UploadArtifactResponse = SoftwareModuleArtifact;
