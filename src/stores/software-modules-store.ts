import { create } from 'zustand';
import { SoftwareModule } from '@/entities';

interface SoftwareModulesState {
  selectedSoftwareModule?: SoftwareModule;
  setSelectedSoftwareModule: (softwareModule?: SoftwareModule) => void;
}

export const useSoftwareModulesStore = create<SoftwareModulesState>((set) => ({
  selectedSoftwareModule: undefined,
  setSelectedSoftwareModule: (softwareModule) => {
    set({ selectedSoftwareModule: softwareModule });
  },
}));
