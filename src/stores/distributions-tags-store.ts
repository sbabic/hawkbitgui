import { create } from 'zustand';
import { DistributionTag } from '@/entities';
import { DistributionSetTagsService } from '@/services/distribution-set-tags-service';

interface DistributionTagsState {
  selectedTags: DistributionTag[];
  allTags: DistributionTag[];
  isLoading?: boolean;
  setSelectedTags: (tags: DistributionTag[]) => void;
  selectedTag?: DistributionTag;
  setSelectedTag: (tag: DistributionTag) => void;
  fetchAllTags: () => Promise<DistributionTag[]>;
  resetTags: () => void;
}

export const useDistributionTagsStore = create<DistributionTagsState>((set) => ({
  selectedTags: [],
  selectedTag: undefined,
  allTags: [],
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  resetTags: () => set({ selectedTags: [] }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  fetchAllTags: async () => {
    set({ isLoading: true });
    const allTags = await DistributionSetTagsService.getTags();
    set({ allTags });
    set({ isLoading: false });
    return allTags;
  },
}));
