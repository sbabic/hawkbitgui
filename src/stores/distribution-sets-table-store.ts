import { create } from 'zustand';
import { Distribution } from '@/entities';

interface DistributionsSetsTableState {
  selectedDistribution?: Distribution;
  setSelectedDistribution: (distribution?: Distribution) => void;
}

export const useDistributionsSetsTableStore = create<DistributionsSetsTableState>((set) => ({
  selectedDistribution: undefined,
  setSelectedDistribution: (distribution) => set({ selectedDistribution: distribution }),
}));
