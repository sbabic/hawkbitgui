import { create } from 'zustand';
import { SoftwareModule, SoftwareModuleKey } from '@/entities';
import { DEFAULT_PAGE_SIZE } from '@/utils/pagination';
import { VisibleColumn } from '@/types/utils/visible-column';
import { enableAllColumnsVisibility } from '@/utils/columns-visibility';

const DEFAULT_VISIBLE_COLUMNS = {
  version: {
    id: 'version',
    label: 'Version',
    isSelected: true,
  },
  description: {
    id: 'description',
    label: 'Description',
    isSelected: false,
  },
  vendor: {
    id: 'vendor',
    label: 'Vendor',
    isSelected: false,
  },
  createdBy: {
    id: 'createdBy',
    label: 'Created By',
    isSelected: false,
  },
  createdAt: {
    id: 'createdAt',
    label: 'Created At',
    isSelected: false,
  },
  lastModifiedBy: {
    id: 'lastModifiedBy',
    label: 'Last Modified By',
    isSelected: false,
  },
  lastModifiedAt: {
    id: 'lastModifiedAt',
    label: 'Last Modified At',
    isSelected: false,
  },
};

interface SoftwareModulesState {
  selectedSoftwareModule?: SoftwareModule;
  page: number;
  size: number;
  visibleColumns: Partial<Record<SoftwareModuleKey, VisibleColumn>>;
  setPage: (page: number) => void;
  setSelectedSoftwareModule: (softwareModule?: SoftwareModule) => void;
  setVisibleColumns: (columns: Record<string, VisibleColumn>) => void;
  expandColumnsVisibility: () => void;
  resetColumnsVisibility: () => void;
}

export const useSoftwareModulesStore = create<SoftwareModulesState>((set) => ({
  selectedSoftwareModule: undefined,
  page: 0,
  size: DEFAULT_PAGE_SIZE,
  visibleColumns: DEFAULT_VISIBLE_COLUMNS,
  setPage: (page) => set({ page }),
  setSelectedSoftwareModule: (softwareModule) => {
    set({ selectedSoftwareModule: softwareModule });
  },
  setVisibleColumns: (columns) => set({ visibleColumns: columns }),
  expandColumnsVisibility: () =>
    set((state) => ({
      visibleColumns: enableAllColumnsVisibility(state.visibleColumns),
    })),
  resetColumnsVisibility: () => set({ visibleColumns: DEFAULT_VISIBLE_COLUMNS }),
}));
