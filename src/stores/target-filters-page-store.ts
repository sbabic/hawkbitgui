import { create } from 'zustand';
import { TargetFilter } from '@/entities/target-filter';

interface TargetFiltersPageState {
  tableType: 'target-filters' | 'set-target-filter';
  selectedTargetFilter?: TargetFilter;
  currentQuery?: string;
  setCurrentQuery: (query?: string) => void;
  setSelectedTargetFilter: (targetFilter?: TargetFilter) => void;
  setTableType: (tableType: 'target-filters' | 'set-target-filter') => void;
}

export const useTargetFiltersPageStore = create<TargetFiltersPageState>((set) => ({
  tableType: 'target-filters',
  selectedTargetFilter: undefined,
  currentQuery: undefined,
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
}));
