import { create } from 'zustand';
import { Rollout } from '@/entities/rollout';

interface RolloutsPageState {
  selectedRollout?: Rollout;
  setSelectedRollout: (rollout?: Rollout) => void;
}

export const useRolloutsPageStore = create<RolloutsPageState>((set) => ({
  selectedRollout: undefined,
  setSelectedRollout: (rollout) => set({ selectedRollout: rollout }),
}));
