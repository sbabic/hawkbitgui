import { create } from 'zustand';
import { Target } from '@/entities';
import { TargetsService } from '@/services/targets-service';

interface TargetsTableState {
    targets: Target[];
    isExpanded: boolean;
    setTargets: (targets: Target[]) => void;
    resetTargets: () => void;
    setIsExpanded: (isExpanded: boolean) => void;
    fetchTargets: () => Promise<void>;
}

export const useTargetsTableStore = create<TargetsTableState>((set) => ({
    targets: [],
    isExpanded: false,
    setTargets: (targets) => set({ targets }),
    resetTargets: () => set({ targets: [] }),
    setIsExpanded: (isExpanded) => set({ isExpanded }),
    fetchTargets: async () => {
        try {
            const response = await TargetsService.fetchTargets();
            set({ targets: response });
        } catch (error) {
            console.error('Failed to fetch targets', error);
        }
    },
}));
