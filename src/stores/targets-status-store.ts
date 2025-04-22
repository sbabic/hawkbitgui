import { create } from 'zustand';
import { TargetStatus } from '@/entities';

interface TargetStatusState {
    selectedStatuses: TargetStatus[];
    setSelectedStatuses: (statuses: TargetStatus[]) => void;
    toggleStatus: (status: TargetStatus) => void;
    resetStatuses: () => void;
}

export const useTargetStatusStore = create<TargetStatusState>((set) => ({
    selectedStatuses: [],
    setSelectedStatuses: (statuses) => set({ selectedStatuses: statuses }),
    toggleStatus: (status) =>
        set((state) => {
            const exists = state.selectedStatuses.includes(status);
            return {
                selectedStatuses: exists ? state.selectedStatuses.filter((s) => s !== status) : [...state.selectedStatuses, status],
            };
        }),
    resetStatuses: () => set({ selectedStatuses: [] }),
}));
