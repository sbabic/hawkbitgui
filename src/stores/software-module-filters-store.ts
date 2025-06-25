import { FilterFiql } from '@/entities';
import { SoftwareModuleType } from '@/entities/software-module-type';
import { create } from 'zustand';

interface SoftwareModuleFiltersState {
  filters: Record<string, FilterFiql>;
  selectedType?: SoftwareModuleType;
  selectedTypes: SoftwareModuleType[];
  setFilters: (filters: Record<string, FilterFiql>) => void;
  setSelectedType: (type: SoftwareModuleType) => void;
  setSelectedTypes: (types: SoftwareModuleType[]) => void;
}

export const useSoftwareModuleFiltersStore = create<SoftwareModuleFiltersState>((set) => ({
  filters: {},
  selectedType: undefined,
  selectedTypes: [],
  setFilters: (filters) => {
    set({ filters });
  },
  setSelectedType: (type) => {
    set({ selectedType: type });
  },
  setSelectedTypes: (types) => {
    set({ selectedTypes: types });
  },
}));
