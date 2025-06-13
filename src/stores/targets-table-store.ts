import { create } from 'zustand';
import { Target } from '@/entities';
import { TargetsService } from '@/services/targets-service';
import { useTargetsFiltersStore } from '@/stores/targets-filters-store';

interface TargetsTableState {
  targets: Target[];
  filteredTargets: Target[];
  isExpanded: boolean;
  isLoading: boolean;
  selectedTarget?: Target;
  setSelectedTarget: (target: Target) => void;
  setFilteredTargets: (filteredTargets: Target[]) => void;
  resetSelectedTarget: () => void;
  setTargets: (targets: Target[]) => void;
  resetTargets: () => void;
  setIsExpanded: (isExpanded: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchTargets: () => Promise<void>;
  pollTargets: () => Promise<void>; // ✅ new method
}

export const useTargetsTableStore = create<TargetsTableState>((set) => ({
  targets: [],
  filteredTargets: [],
  isExpanded: false,
  isLoading: false,
  selectedTarget: undefined,
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
      const response = await TargetsService.fetchTargets({ filters: Object.values(filters) });
      set({ targets: response, filteredTargets: response });
    } catch (error) {
      console.error('Failed to fetch targets', error);
    } finally {
      set({ isLoading: false });
    }
  },

  pollTargets: async () => {
    try {
      const filters = useTargetsFiltersStore.getState().filters;
      const response = await TargetsService.fetchTargets({ filters: Object.values(filters) });
      set({ targets: response, filteredTargets: response });
    } catch (error) {
      console.error('Failed to poll targets', error);
    }
  },
}));
