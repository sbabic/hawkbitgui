import { create } from 'zustand';
import { Metadata } from '@/entities';
import { TargetsService } from '@/services/targets-service';

interface TargetsMetadataTableState {
    metadata: Metadata[];
    selectedMetadata?: Metadata;
    setSelectedMetadata: (metadata: Metadata) => void;
    resetSelectedMetadata: () => void;
    setMetadata: (metadata: Metadata[]) => void;
    resetMetadata: () => void;
    fetchMetadata: (controllerId: string) => Promise<void>;
}

export const useTargetsMetadataTableStore = create<TargetsMetadataTableState>((set) => ({
    metadata: [],
    selectedMetadata: undefined,
    setSelectedMetadata: (metadata) => set({ selectedMetadata: metadata }),
    resetSelectedMetadata: () => set({ selectedMetadata: undefined }),
    setMetadata: (metadata) => set({ metadata }),
    resetMetadata: () => set({ metadata: [] }),
    fetchMetadata: async (controllerId: string) => {
        try {
            const response = await TargetsService.getMetadata(controllerId);
            set({ metadata: response });
        } catch (error) {
            console.error('Failed to fetch metadata', error);
        }
    },
}));
