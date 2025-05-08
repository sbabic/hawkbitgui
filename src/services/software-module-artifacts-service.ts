import axiosInstance from '@/lib/axios';
import { md5 } from 'js-md5';
import { UploadArtifactInput, UploadArtifactResponse } from './software-module-artifacts-service.types';

async function calculateHash(file: File | Blob, algorithm: 'SHA-1' | 'SHA-256'): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

async function calculateMD5(file: File | Blob): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const hash = md5.create();
    hash.update(arrayBuffer);
    return hash.hex();
}

export class SoftwareModuleArtifactsService {
    static async uploadArtifact({ softwareModuleId, file, filename }: UploadArtifactInput): Promise<UploadArtifactResponse> {
        const [md5sum, shalsum, sha256sum] = await Promise.all([calculateMD5(file), calculateHash(file, 'SHA-1'), calculateHash(file, 'SHA-256')]);

        const formData = new FormData();
        formData.append('file', file);

        const queryString = new URLSearchParams({
            md5sum,
            shalsum,
            sha256sum,
            filename,
        });

        const response = await axiosInstance.post<UploadArtifactResponse>(
            `/softwaremodules/${softwareModuleId}/artifacts?${queryString.toString()}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    }
}
