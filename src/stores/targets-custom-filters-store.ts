import { create } from 'zustand';
import { TargetFiltersService } from '@/services/target-filters-service';
import { TargetFilter } from '@/entities/target-filter'; // Assuming RolloutType is defined here

interface TargetFiltersState {
  selectedFilters: TargetFilter[];
  selectedFilter?: TargetFilter;
  allFilters: TargetFilter[];
  isLoading?: boolean;
  setSelectedFilters: (filters: TargetFilter[]) => void;
  setSelectedFilter: (filter: TargetFilter) => void;
  fetchAllFilters: () => Promise<TargetFilter[]>;
  resetFilters: () => void;
}

export const useTargetsCustomsFiltersStore = create<TargetFiltersState>((set) => ({
  selectedFilters: [],
  selectedFilter: undefined,
  allFilters: [],
  isLoading: false,
  setSelectedFilters: (filters) => set({ selectedFilters: filters }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
  resetFilters: () => set({ selectedFilters: [] }),
  fetchAllFilters: async () => {
    set({ isLoading: true });
    const allFilters = await TargetFiltersService.fetchTargetFilters();
    set({ allFilters, isLoading: false });
    return allFilters;
  },
}));
