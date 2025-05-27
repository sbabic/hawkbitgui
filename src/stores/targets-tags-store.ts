import { create } from 'zustand';
import { Tag } from '@/entities';
import { TargetTagsService } from '@/services/target-tags-service';

interface TargetTagsState {
  selectedTags: Tag[];
  allTags: Tag[];
  isLoading?: boolean;
  setSelectedTags: (tags: Tag[]) => void;
  fetchAllTags: () => Promise<Tag[]>;
  resetTags: () => void;
}

export const useTargetTagsStore = create<TargetTagsState>((set) => ({
  selectedTags: [],
  allTags: [],
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  resetTags: () => set({ selectedTags: [] }),
  fetchAllTags: async () => {
    set({ isLoading: true });
    const allTags = await TargetTagsService.getTags();
    set({ allTags });
    set({ isLoading: false });
    return allTags;
  },
}));
