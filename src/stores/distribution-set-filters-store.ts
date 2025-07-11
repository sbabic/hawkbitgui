import { FilterFiql, Tag } from '@/entities';
import { create } from 'zustand';

interface DistributionSetFiltersState {
  filters: Record<string, FilterFiql>;
  selectedTag?: Tag;
  selectedTags: Tag[];
  setFilters: (filters: Record<string, FilterFiql>) => void;
  setSelectedTag: (tag: Tag) => void;
  setSelectedTags: (tags: Tag[]) => void;
}

export const useDistributionSetFiltersStore = create<DistributionSetFiltersState>((set) => ({
  filters: {},
  selectedTag: undefined,
  selectedTags: [],
  setFilters: (filters) => {
    set({ filters });
  },
  setSelectedTag: (tag) => {
    set({ selectedTag: tag });
  },
  setSelectedTags: (tags) => {
    set({ selectedTags: tags });
  },
}));
