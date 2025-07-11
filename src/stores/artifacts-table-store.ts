import { create } from 'zustand';
import { VisibleColumn } from '@/types/utils/visible-column';
import { SoftwareModuleArtifactKey } from '@/entities/software-module-artifact';

const DEFAULT_VISIBLE_COLUMNS = {
  version: {
    id: 'name',
    label: 'File name',
    isSelected: true,
  },
  size: {
    id: 'size',
    label: 'Size (B)',
    isSelected: true,
  },
  'hashes.sha1': {
    id: 'hashes.sha1',
    label: 'SHA1 checksum',
    isSelected: true,
  },
  'hashes.md5': {
    id: 'hashes.md5',
    label: 'MD5 checksum',
    isSelected: true,
  },
  'hashes.sha256': {
    id: 'hashes.sha256',
    label: 'SHA256 checksum',
    isSelected: true,
  },
  lastModifiedAt: {
    id: 'lastModifiedAt',
    label: 'Last modified',
    isSelected: true,
  },
};

interface ArtifactsTableState {
  visibleColumns: Partial<Record<SoftwareModuleArtifactKey, VisibleColumn>>;
  setVisibleColumns: (columns: Record<string, VisibleColumn>) => void;
}

export const useArtifactsTableStore = create<ArtifactsTableState>((set) => ({
  visibleColumns: DEFAULT_VISIBLE_COLUMNS,
  setVisibleColumns: (columns) => set({ visibleColumns: columns }),
}));
