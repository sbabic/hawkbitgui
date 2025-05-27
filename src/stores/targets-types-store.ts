import { create } from 'zustand';
import { TargetType } from '@/entities';
import { TargetsTypesService } from '@/services/targets-types-service';

interface TargetTypesState {
  selectedTypes: TargetType[];
  setSelectedTypes: (types: TargetType[]) => void;
  resetTypes: () => void;
  allTypes: TargetType[];
  isLoading?: boolean;
  fetchAllTypes: () => Promise<TargetType[]>;
}

export const useTargetTypesStore = create<TargetTypesState>((set) => ({
  selectedTypes: [],
  allTypes: [],
  setSelectedTypes: (types) => set({ selectedTypes: types }),
  resetTypes: () => set({ selectedTypes: [] }),
  fetchAllTypes: async () => {
    set({ isLoading: true });
    const allTypes = await TargetsTypesService.fetchTargetsTypes();
    set({ allTypes });
    set({ isLoading: false });
    return allTypes;
  },
}));
