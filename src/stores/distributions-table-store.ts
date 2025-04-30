import { create } from 'zustand';
import { Distribution } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';

interface DistributionsTableState {
    distributions: Distribution[];
    filteredDistributions: Distribution[];
    isExpanded: boolean;
    selectedDistribution?: Distribution;
    setSelectedDistribution: (distribution: Distribution) => void;
    setFilteredDistributions: (filtered: Distribution[]) => void;
    resetSelectedDistribution: () => void;
    setDistributions: (distributions: Distribution[]) => void;
    resetDistributions: () => void;
    setIsExpanded: (isExpanded: boolean) => void;
    fetchDistributions: () => Promise<void>;
}

export const useDistributionsTableStore = create<DistributionsTableState>((set) => ({
    distributions: [],
    filteredDistributions: [],
    isExpanded: false,
    selectedDistribution: undefined,
    setSelectedDistribution: (distribution) => set({ selectedDistribution: distribution }),
    setFilteredDistributions: (filtered) => set({ filteredDistributions: filtered }),
    resetSelectedDistribution: () => set({ selectedDistribution: undefined }),
    setDistributions: (distributions) => set({ distributions, filteredDistributions: distributions }),
    resetDistributions: () => set({ distributions: [], filteredDistributions: [] }),
    setIsExpanded: (isExpanded) => set({ isExpanded }),
    fetchDistributions: async () => {
        try {
            const response = await DistributionSetsService.fetchDistributionSets();
            set({ distributions: response, filteredDistributions: response });
        } catch (error) {
            console.error('Failed to fetch distributions', error);
        }
    },
}));
