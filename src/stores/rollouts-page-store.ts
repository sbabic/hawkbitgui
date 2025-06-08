import { create } from 'zustand';
import { Rollout, RolloutDeployGroup } from '@/entities/rollout';

interface RolloutsPageState {
  tableType: 'rollouts' | 'deploy-groups' | 'deploy-group-targets';
  selectedRollout?: Rollout;
  selectedDeployGroup?: RolloutDeployGroup;
  setSelectedRollout: (rollout?: Rollout) => void;
  setSelectedDeployGroup: (deployGroup?: RolloutDeployGroup) => void;
  setTableType: (tableType: 'rollouts' | 'deploy-groups' | 'deploy-group-targets') => void;
}

export const useRolloutsPageStore = create<RolloutsPageState>((set) => ({
  tableType: 'rollouts',
  selectedRollout: undefined,
  selectedDeployGroup: undefined,
  setSelectedRollout: (rollout) => {
    set({ selectedDeployGroup: undefined });
    set({ selectedRollout: rollout });
    set({ tableType: 'deploy-groups' });
  },
  setSelectedDeployGroup: (deployGroup) => {
    set({ selectedDeployGroup: deployGroup });
    set({ tableType: 'deploy-group-targets' });
  },
  setTableType: (tableType) => {
    if (tableType === 'rollouts') {
      set({ selectedRollout: undefined, selectedDeployGroup: undefined });
    } else if (tableType === 'deploy-groups') {
      set({ selectedDeployGroup: undefined });
    }
    set({ tableType });
  },
}));
