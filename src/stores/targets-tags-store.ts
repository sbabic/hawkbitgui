import { create } from 'zustand';
import { Tag } from '@/entities';
import { TargetTagsService } from '@/services/target-tags-service';

interface TargetTagsState {
  selectedTags: Tag[];
  allTags: Tag[];
  isLoading?: boolean;
  setSelectedTags: (tags: Tag[]) => void;
  selectedTag?: Tag;
  setSelectedTag: (tag: Tag) => void;
  fetchAllTags: () => Promise<Tag[]>;
  resetTags: () => void;
}

export const useTargetTagsStore = create<TargetTagsState>((set) => ({
  selectedTags: [],
  selectedTag: undefined,
  allTags: [],
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  resetTags: () => set({ selectedTags: [] }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  fetchAllTags: async () => {
    set({ isLoading: true });
    const allTags = await TargetTagsService.getTags();
    set({ allTags });
    set({ isLoading: false });
    return allTags;
  },
}));
