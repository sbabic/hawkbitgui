import { create } from 'zustand';
import { Distribution } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useDistributionsFiltersStore } from '@/stores/distributions-filters-store';

interface DistributionsTableState {
  distributions: Distribution[];
  filteredDistributions: Distribution[];
  isExpanded: boolean;
  isLoading: boolean;
  selectedDistribution?: Distribution;
  setSelectedDistribution: (distribution: Distribution) => void;
  setFilteredDistributions: (filtered: Distribution[]) => void;
  resetSelectedDistribution: () => void;
  setDistributions: (distributions: Distribution[]) => void;
  resetDistributions: () => void;
  setIsExpanded: (isExpanded: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchDistributions: () => Promise<void>;
  pollDistributions: () => Promise<void>;
}

export const useDistributionsTableStore = create<DistributionsTableState>((set) => ({
  distributions: [],
  filteredDistributions: [],
  isExpanded: false,
  isLoading: false,
  selectedDistribution: undefined,
  setSelectedDistribution: (distribution) => set({ selectedDistribution: distribution }),
  setFilteredDistributions: (filtered) => set({ filteredDistributions: filtered }),
  resetSelectedDistribution: () => set({ selectedDistribution: undefined }),
  setDistributions: (distributions) => set({ distributions, filteredDistributions: distributions }),
  resetDistributions: () => set({ distributions: [], filteredDistributions: [] }),
  setIsExpanded: (isExpanded) => set({ isExpanded }),
  setIsLoading: (isLoading) => set({ isLoading }),
  fetchDistributions: async () => {
    set({ isLoading: true });
    try {
      const filters = useDistributionsFiltersStore.getState().filters;
      const response = await DistributionSetsService.fetchDistributionSets({ filters: Object.values(filters) });
      set({ distributions: response, filteredDistributions: response });
    } catch (error) {
      console.error('Failed to fetch distributions', error);
    } finally {
      set({ isLoading: false });
    }
  },
  pollDistributions: async () => {
    try {
      const filters = useDistributionsFiltersStore.getState().filters;
      const response = await DistributionSetsService.fetchDistributionSets({ filters: Object.values(filters) });
      set({ distributions: response, filteredDistributions: response });
    } catch (error) {
      console.error('Failed to poll targets', error);
    }
  },
}));
