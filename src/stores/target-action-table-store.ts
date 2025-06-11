import { create } from 'zustand';
import { TargetAction } from '@/entities/target-action';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { TargetsService } from '@/services/targets-service';

interface TargetActionsTableState {
  actions: TargetAction[];
  isExpanded: boolean;
  selectedAction?: TargetAction;
  setSelectedAction: (action: TargetAction) => void;
  resetSelectedAction: () => void;
  setActions: (actions: TargetAction[]) => void;
  resetActions: () => void;
  setIsExpanded: (isExpanded: boolean) => void;
  fetchActions: () => Promise<void>;
}

export const useTargetActionsTableStore = create<TargetActionsTableState>((set) => ({
  actions: [],
  isExpanded: false,
  selectedAction: undefined,
  setSelectedAction: (action) => set({ selectedAction: action }),
  resetSelectedAction: () => set({ selectedAction: undefined }),
  setActions: (actions) => set({ actions }),
  resetActions: () => set({ actions: [] }),
  setIsExpanded: (isExpanded) => set({ isExpanded }),
  fetchActions: async () => {
    try {
      const selectedTarget = useTargetsTableStore.getState().selectedTarget;
      if (!selectedTarget) {
        console.warn('No target selected or controllerId is missing');
        return;
      }
      const targetActions = await TargetsService.fetchActions(selectedTarget.controllerId);
      set({ actions: targetActions });
    } catch (error) {
      console.error('Failed to fetch target actions', error);
    }
  },
}));
