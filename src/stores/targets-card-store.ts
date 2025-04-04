import { create } from 'zustand';
import { Target } from '@/entities';

interface TargetsCardState {
    selectedTarget?: Target;
    setSelectedTarget: (target: Target) => void;
    resetSelectedTarget: () => void;
}

export const useTargetsCardStore = create<TargetsCardState>((set) => ({
    selectedTarget: undefined,
    setSelectedTarget: (target) => set({ selectedTarget: target }),
    resetSelectedTarget: () => set({ selectedTarget: undefined }),
}));
