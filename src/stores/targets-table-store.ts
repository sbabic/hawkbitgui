import { create } from 'zustand';
import { Target } from '@/entities';
import { TargetsService } from '@/services/targets-service';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';
import { DEFAULT_PAGE_SIZE } from '@/utils/pagination';

interface TargetsTableState {
  targets: Target[];
  filteredTargets: Target[];
  isExpanded: boolean;
  isLoading: boolean;
  selectedTarget?: Target;
  page: number;
  size: number;
  total: number;
  setPage: (page: number) => void;
  setTotal: (total: number) => void;
  setSelectedTarget: (target: Target) => void;
  setFilteredTargets: (filteredTargets: Target[]) => void;
  resetSelectedTarget: () => void;
  setTargets: (targets: Target[]) => void;
  resetTargets: () => void;
  setIsExpanded: (isExpanded: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchTargets: () => Promise<void>;
  pollTargets: () => Promise<void>;
}

export const useTargetsTableStore = create<TargetsTableState>((set) => ({
  targets: [],
  filteredTargets: [],
  isExpanded: false,
  isLoading: false,
  selectedTarget: undefined,
  page: 0,
  size: DEFAULT_PAGE_SIZE,
  total: 0,
  setPage: (page) => set({ page }),
  setTotal: (total: number) => set({ total }),
  setSelectedTarget: (target) => set({ selectedTarget: target }),
  setFilteredTargets: (filteredTargets) => set({ filteredTargets }),
  resetSelectedTarget: () => set({ selectedTarget: undefined }),
  setTargets: (targets) => set({ targets, filteredTargets: targets }),
  resetTargets: () => set({ targets: [], filteredTargets: [] }),
  setIsExpanded: (isExpanded) => set({ isExpanded }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchTargets: async () => {
    set({ isLoading: true });
    try {
      const filters = useTargetsFiltersStore.getState().filters;
      const { page, size } = useTargetsTableStore.getState();
      const { targets, totalTargets } = await TargetsService.fetchTargets({
        filters: Object.values(filters),
        queryParams: { offset: page * size, limit: size, sort: 'name:ASC' },
      });
      set({ targets, filteredTargets: targets, total: totalTargets });
    } catch (error) {
      console.error('Failed to fetch targets', error);
    } finally {
      set({ isLoading: false });
    }
  },

  pollTargets: async () => {
    try {
      const filters = useTargetsFiltersStore.getState().filters;
      const { page, size } = useTargetsTableStore.getState();
      const { targets, totalTargets } = await TargetsService.fetchTargets({
        filters: Object.values(filters),
        queryParams: { offset: page * size, limit: size, sort: 'name:ASC' },
      });
      set({ targets, filteredTargets: targets, total: totalTargets });
    } catch (error) {
      console.error('Failed to poll targets', error);
    }
  },
}));
