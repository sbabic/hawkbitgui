import { create } from 'zustand';
import { TargetFilterKey } from '@/entities/target-filter';
import { VisibleColumn } from '@/types/utils/visible-column';

type TargetFiltersColumnKey = TargetFilterKey | 'actions';

interface TargetFiltersTableState {
  page: number;
  size: number;
  visibleColumns: Partial<Record<TargetFiltersColumnKey, VisibleColumn>>;
  setPage: (page: number) => void;
  setVisibleColumns: (columns: Record<string, VisibleColumn>) => void;
}

const DEFAULT_VISIBLE_COLUMNS: Partial<Record<TargetFiltersColumnKey, VisibleColumn>> = {
  name: {
    id: 'name',
    label: 'Name',
    isSelected: true,
  },
  createdBy: {
    id: 'createdBy',
    label: 'Created By',
    isSelected: true,
  },
  createdAt: {
    id: 'createdAt',
    label: 'Created Date',
    isSelected: true,
  },
  lastModifiedBy: {
    id: 'lastModifiedBy',
    label: 'Modified By',
    isSelected: true,
  },
  lastModifiedAt: {
    id: 'lastModifiedAt',
    label: 'Modified Date',
    isSelected: true,
  },
  autoAssignDistributionSetName: {
    id: 'autoAssignDistributionSetName',
    label: 'Auto assignment',
    isSelected: true,
  },
  actions: {
    id: 'actions',
    label: 'Delete',
    isSelected: true,
  },
};

export const useTargetFiltersTableStore = create<TargetFiltersTableState>((set) => ({
  page: 0,
  size: 20,
  visibleColumns: DEFAULT_VISIBLE_COLUMNS,
  setPage: (page) => set({ page }),
  setVisibleColumns: (columns) => set({ visibleColumns: columns }),
}));
