import { create } from 'zustand';
import { Distribution } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import { useDistributionsFiltersStore } from '@/stores/distributions-filters-store';
import { DEFAULT_PAGE_SIZE } from '@/utils/pagination';

interface DistributionsTableState {
  distributions: Distribution[];
  filteredDistributions: Distribution[];
  isExpanded: boolean;
  isLoading: boolean;
  selectedDistribution?: Distribution;
  page: number;
  size: number;
  total: number;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
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
  page: 0,
  size: DEFAULT_PAGE_SIZE,
  total: 0,
  setPage: (page) => set({ page }),
  setTotal: (total: number) => set({ total }),
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
      const { page, size } = useDistributionsTableStore.getState();
      const { distributionSets, totalDistributionSets } = await DistributionSetsService.fetchDistributionSets(
        { filters: Object.values(filters) },
        { offset: page * size, limit: size, sort: 'name:ASC' }
      );
      set({ distributions: distributionSets, filteredDistributions: distributionSets, total: totalDistributionSets });
    } catch (error) {
      console.error('Failed to fetch distributions', error);
    } finally {
      set({ isLoading: false });
    }
  },
  pollDistributions: async () => {
    try {
      const filters = useDistributionsFiltersStore.getState().filters;
      const { page, size } = useDistributionsTableStore.getState();
      const { distributionSets, totalDistributionSets } = await DistributionSetsService.fetchDistributionSets(
        { filters: Object.values(filters) },
        { offset: page * size, limit: size, sort: 'name:ASC' }
      );
      set({ distributions: distributionSets, filteredDistributions: distributionSets, total: totalDistributionSets });
    } catch (error) {
      console.error('Failed to poll distributions', error);
    }
  },
}));
