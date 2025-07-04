import { create } from 'zustand';
import { Distribution, DistributionKey } from '@/entities';
import { DEFAULT_PAGE_SIZE } from '@/utils/pagination';
import { VisibleColumn } from '@/types/utils/visible-column';
import { enableAllColumnsVisibility } from '@/utils/columns-visibility';

interface DistributionsSetsTableState {
  selectedDistribution?: Distribution;
  page: number;
  size: number;
  visibleColumns: Partial<Record<DistributionKey, VisibleColumn>>;
  setPage: (page: number) => void;
  setSelectedDistribution: (distribution?: Distribution) => void;
  setVisibleColumns: (columns: Record<string, VisibleColumn>) => void;
  expandColumnsVisibility: () => void;
  resetColumnsVisibility: () => void;
}

const DEFAULT_VISIBLE_COLUMNS: Partial<Record<DistributionKey, VisibleColumn>> = {
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

export const useDistributionsSetsTableStore = create<DistributionsSetsTableState>((set) => ({
  selectedDistribution: undefined,
  page: 0,
  size: DEFAULT_PAGE_SIZE,
  visibleColumns: DEFAULT_VISIBLE_COLUMNS,
  setPage: (page) => set({ page }),
  setSelectedDistribution: (distribution) => set({ selectedDistribution: distribution }),
  setVisibleColumns: (columns) => set({ visibleColumns: columns }),
  resetColumnsVisibility: () => set({ visibleColumns: DEFAULT_VISIBLE_COLUMNS }),
  expandColumnsVisibility: () =>
    set((state) => ({
      visibleColumns: enableAllColumnsVisibility(state.visibleColumns),
    })),
}));
