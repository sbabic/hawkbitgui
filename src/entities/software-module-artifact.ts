interface ArtifactHash {
  sha1: string;
  md5: string;
  sha256: string;
}

export interface SoftwareModuleArtifact {
  id: number;
  hashes: ArtifactHash;
  providedFilename: string;
  size: number;
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
}

export type SoftwareModuleArtifactKey = keyof SoftwareModuleArtifact;
