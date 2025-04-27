import { create } from 'zustand';
import { Tag } from '@/entities';

interface TargetTagsState {
    selectedTags: Tag[];
    setSelectedTags: (tags: Tag[]) => void;
    resetTags: () => void;
}

export const useTargetTagsStore = create<TargetTagsState>((set) => ({
    selectedTags: [],
    setSelectedTags: (tags) => set({ selectedTags: tags }),
    resetTags: () => set({ selectedTags: [] }),
}));
