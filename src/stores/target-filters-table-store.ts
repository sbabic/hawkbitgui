import { create } from 'zustand';

interface TargetFiltersTableState {
  page: number;
  size: number;
  setPage: (page: number) => void;
}

export const useTargetFiltersTableStore = create<TargetFiltersTableState>((set) => ({
  page: 0,
  size: 20,
  setPage: (page) => set({ page }),
}));
