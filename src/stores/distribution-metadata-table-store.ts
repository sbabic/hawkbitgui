import { create } from 'zustand';
import { Metadata } from '@/entities';
import { DistributionSetsService } from '@/services/distribution-sets-service';

interface DistributionMetadataTableState {
  metadata: Metadata[];
  selectedMetadata?: Metadata;
  setSelectedMetadata: (metadata: Metadata) => void;
  resetSelectedMetadata: () => void;
  setMetadata: (metadata: Metadata[]) => void;
  resetMetadata: () => void;
  fetchMetadata: (distributionId: string | number) => Promise<void>;
}

export const useDistributionMetadataTableStore = create<DistributionMetadataTableState>((set) => ({
  metadata: [],
  selectedMetadata: undefined,
  setSelectedMetadata: (metadata) => set({ selectedMetadata: metadata }),
  resetSelectedMetadata: () => set({ selectedMetadata: undefined }),
  setMetadata: (metadata) => set({ metadata }),
  resetMetadata: () => set({ metadata: [] }),
  fetchMetadata: async (distributionId: string | number) => {
    try {
      const response = await DistributionSetsService.getMetadata(distributionId);
      set({ metadata: response });
    } catch (error) {
      console.error('Failed to fetch metadata', error);
    }
  },
}));
