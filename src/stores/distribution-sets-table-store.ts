import { create } from 'zustand';
import { Distribution } from '@/entities';
import { DEFAULT_PAGE_SIZE } from '@/utils/pagination';

interface DistributionsSetsTableState {
  selectedDistribution?: Distribution;
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSelectedDistribution: (distribution?: Distribution) => void;
}

export const useDistributionsSetsTableStore = create<DistributionsSetsTableState>((set) => ({
  selectedDistribution: undefined,
  page: 0,
  size: DEFAULT_PAGE_SIZE,
  setPage: (page) => set({ page }),
  setSelectedDistribution: (distribution) => set({ selectedDistribution: distribution }),
}));
