import { create } from 'zustand';
import { TargetFilter } from '@/entities/target-filter';
import { RolloutType } from '@/entities/rollout';

interface TargetFiltersPageState {
  tableType: 'target-filters' | 'set-target-filter';
  selectedTargetFilter?: TargetFilter;
  currentQuery?: string;
  autoAssign?: {
    targetFilterId: number;
    distributionSetId?: number;
    actionType?: RolloutType;
  };
  setCurrentQuery: (query?: string) => void;
  setSelectedTargetFilter: (targetFilter?: TargetFilter) => void;
  setTableType: (tableType: 'target-filters' | 'set-target-filter') => void;
  setAutoAssign: (autoAssign?: { targetFilterId: number; distributionSetId?: number; actionType?: RolloutType }) => void;
}

export const useTargetFiltersPageStore = create<TargetFiltersPageState>((set) => ({
  tableType: 'target-filters',
  selectedTargetFilter: undefined,
  currentQuery: undefined,
  autoAssign: undefined,
  setCurrentQuery: (query) => {
    set({ currentQuery: query });
  },
  setSelectedTargetFilter: (targetFilter) => {
    set({ selectedTargetFilter: targetFilter });
    set({ currentQuery: targetFilter?.query });
    set({ tableType: 'set-target-filter' });
  },
  setTableType: (tableType) => {
    if (tableType === 'target-filters') {
      set({ selectedTargetFilter: undefined });
      set({ currentQuery: undefined });
    }
    set({ tableType });
  },
  setAutoAssign: (autoAssign) => {
    set({ autoAssign });
  },
}));
