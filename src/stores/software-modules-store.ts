import { create } from 'zustand';
import { SoftwareModule } from '@/entities';
import { DEFAULT_PAGE_SIZE } from '@/utils/pagination';

interface SoftwareModulesState {
  selectedSoftwareModule?: SoftwareModule;
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSelectedSoftwareModule: (softwareModule?: SoftwareModule) => void;
}

export const useSoftwareModulesStore = create<SoftwareModulesState>((set) => ({
  selectedSoftwareModule: undefined,
  page: 0,
  size: DEFAULT_PAGE_SIZE,
  setPage: (page) => set({ page }),
  setSelectedSoftwareModule: (softwareModule) => {
    set({ selectedSoftwareModule: softwareModule });
  },
}));
