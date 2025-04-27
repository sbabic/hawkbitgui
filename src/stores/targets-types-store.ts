import { create } from 'zustand';
import { TargetType } from '@/entities';

interface TargetTypesState {
    selectedTypes: TargetType[];
    setSelectedTypes: (types: TargetType[]) => void;
    resetTypes: () => void;
}

export const useTargetTypesStore = create<TargetTypesState>((set) => ({
    selectedTypes: [],
    setSelectedTypes: (types) => set({ selectedTypes: types }),
    resetTypes: () => set({ selectedTypes: [] }),
}));
