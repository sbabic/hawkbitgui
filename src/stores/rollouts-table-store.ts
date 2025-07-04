import { create } from 'zustand';
import { RolloutKey } from '@/entities/rollout';
import { VisibleColumn } from '@/types/utils/visible-column';

interface RolloutsTableState {
  visibleColumns: Partial<Record<RolloutKey, VisibleColumn>>;
  setVisibleColumns: (columns: Record<string, VisibleColumn>) => void;
}

export const useRolloutsTableStore = create<RolloutsTableState>((set) => ({
  visibleColumns: {
    description: {
      id: 'description',
      label: 'Description',
      isSelected: false,
    },
    '_links.distributionset.name': {
      id: '_links.distributionset.name',
      label: 'Distribution set',
      isSelected: true,
    },
    status: {
      id: 'status',
      label: 'Status',
      isSelected: true,
    },
    type: {
      id: 'type',
      label: 'Type',
      isSelected: false,
    },
    totalTargetsPerStatus: {
      id: 'totalTargetsPerStatus',
      label: 'Detail status',
      isSelected: true,
    },
    totalGroups: {
      id: 'totalGroups',
      label: 'Groups',
      isSelected: true,
    },
    totalTargets: {
      id: 'totalTargets',
      label: 'Targets',
      isSelected: true,
    },
    approveDecidedBy: {
      id: 'approveDecidedBy',
      label: 'Decided by',
      isSelected: false,
    },
    approvalRemark: {
      id: 'approvalRemark',
      label: 'Approval remark',
      isSelected: false,
    },
    createdBy: {
      id: 'createdBy',
      label: 'Created by',
      isSelected: false,
    },
    createdAt: {
      id: 'createdAt',
      label: 'Created at',
      isSelected: false,
    },
    lastModifiedBy: {
      id: 'lastModifiedBy',
      label: 'Last modified by',
      isSelected: false,
    },
    lastModifiedAt: {
      id: 'lastModifiedAt',
      label: 'Last modified at',
      isSelected: false,
    },
  },
  setVisibleColumns: (columns) => {
    set({ visibleColumns: columns });
  },
}));
