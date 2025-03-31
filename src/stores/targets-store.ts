import { create } from 'zustand';
import { Target } from '@/entities';

interface TargetsState {
    targets: Target[];
    setTargets: (targets: Target[]) => void;
    resetTargets: () => void;
}

export const useTargetsStore = create<TargetsState>((set) => ({
    targets: [],
    setTargets: (targets) => set({ targets }),
    resetTargets: () => set({ targets: [] }),
}));
