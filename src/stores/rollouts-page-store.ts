import { create } from 'zustand';
import { Rollout, RolloutDeployGroup } from '@/entities/rollout';

type RolloutsTableType = 'rollouts' | 'deploy-groups' | 'deploy-group-targets';
interface RolloutsPageState {
  tableType: RolloutsTableType;
  selectedRollout?: Rollout;
  selectedDeployGroup?: RolloutDeployGroup;
  setSelectedRollout: (rollout?: Rollout) => void;
  setSelectedDeployGroup: (deployGroup?: RolloutDeployGroup) => void;
  setTableType: (
    payload:
      | { tableType: 'rollouts' }
      | { tableType: 'deploy-groups'; selectedRollout: Rollout }
      | { tableType: 'deploy-group-targets'; selectedDeployGroup: RolloutDeployGroup }
  ) => void;
}

export const useRolloutsPageStore = create<RolloutsPageState>((set) => ({
  tableType: 'rollouts',
  selectedRollout: undefined,
  selectedDeployGroup: undefined,
  setSelectedRollout: (rollout) => {
    set({ selectedRollout: rollout });
  },
  setSelectedDeployGroup: (deployGroup) => {
    set({ selectedDeployGroup: deployGroup });
  },
  setTableType: (payload) => {
    const { tableType } = payload;
    if (tableType === 'rollouts') {
      set({ selectedRollout: undefined, selectedDeployGroup: undefined });
    } else if (tableType === 'deploy-groups') {
      const { selectedRollout } = payload;
      set({ selectedRollout: selectedRollout, selectedDeployGroup: undefined });
    } else if (tableType === 'deploy-group-targets') {
      const { selectedDeployGroup } = payload;
      set({ selectedDeployGroup });
    }
    set({ tableType });
  },
}));
