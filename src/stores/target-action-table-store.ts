import { create } from 'zustand';
import { TargetAction } from '@/entities/target-action';
import { TargetsService } from '@/services/targets-service';

interface TargetActionsTableState {
  selectedTargetId?: string;
  actions: TargetAction[];
  isExpanded: boolean;
  selectedAction?: TargetAction;
  setSelectedAction: (action: TargetAction) => void;
  resetSelectedAction: () => void;
  setActions: (actions: TargetAction[]) => void;
  resetActions: () => void;
  setIsExpanded: (isExpanded: boolean) => void;
  fetchActions: (controllerId: string) => Promise<void>;
  setSelectedTargetId: (targetId: string) => void;
}

export const useTargetActionsTableStore = create<TargetActionsTableState>((set) => ({
  actions: [],
  selectedTargetId: undefined,
  isExpanded: false,
  selectedAction: undefined,
  setSelectedAction: (action) => set({ selectedAction: action }),
  resetSelectedAction: () => set({ selectedAction: undefined }),
  setActions: (actions) => set({ actions }),
  resetActions: () => set({ actions: [] }),
  setIsExpanded: (isExpanded) => set({ isExpanded }),
  setSelectedTargetId: (targetId) => set({ selectedTargetId: targetId }),
  fetchActions: async (controllerId: string) => {
    try {
      const targetActions = await TargetsService.fetchActions(controllerId);
      set({ actions: targetActions });
    } catch (error) {
      console.error('Failed to fetch target actions', error);
    }
  },
}));
