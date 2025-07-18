import axiosInstance from '@/lib/axios';
import { md5 } from 'js-md5';
import { SHA1, SHA256 } from 'crypto-js';
import {
  DeleteArtifactInput,
  DownloadArtifactInput,
  GetArtifactsInput,
  GetArtifactsResponse,
  UploadArtifactInput,
  UploadArtifactResponse,
} from './software-module-artifacts-service.types';
import { isDefined } from '@/utils/is-defined';

function arrayBufferToString(arrayBuffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(arrayBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function calculateHash(file: File | Blob, algorithm: 'SHA-1' | 'SHA-256'): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  if (isDefined(crypto.subtle)) {
    const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);
    return arrayBufferToString(hashBuffer);
  }

  // Insecure contexts (http) for local usage purposes only
  if (algorithm === 'SHA-1') {
    return SHA1(arrayBufferToString(arrayBuffer)).toString();
  } else if (algorithm === 'SHA-256') {
    return SHA256(arrayBufferToString(arrayBuffer)).toString();
  }

  throw new Error('Not supported hashing algorithm');
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

    const response = await axiosInstance.post<UploadArtifactResponse>(`/softwaremodules/${softwareModuleId}/artifacts?${queryString.toString()}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async getArtifacts({ softwareModuleId }: GetArtifactsInput): Promise<GetArtifactsResponse> {
    const response = await axiosInstance.get<GetArtifactsResponse>(`/softwaremodules/${softwareModuleId}/artifacts`);
    return response.data;
  }

  static async deleteArtifact({ softwareModuleId, artifactId }: DeleteArtifactInput): Promise<void> {
    await axiosInstance.delete(`/softwaremodules/${softwareModuleId}/artifacts/${artifactId}`);
  }

  static async downloadArtifact({ softwareModuleId, artifactId }: DownloadArtifactInput): Promise<Blob> {
    const response = await axiosInstance.get(`/softwaremodules/${softwareModuleId}/artifacts/${artifactId}/download`, {
      responseType: 'blob',
      headers: { Accept: '*/*' },
    });

    return response.data;
  }
}
