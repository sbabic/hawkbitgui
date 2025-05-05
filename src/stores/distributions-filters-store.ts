import { create } from 'zustand';
import { FilterFiql } from '@/entities';

interface DistributionsFiltersState {
    filters: Record<string, FilterFiql>;
    setFilters: (filter: Record<string, FilterFiql>) => void;
    resetFilters: () => void;
    addFilter: (filter: FilterFiql) => void;
    removeFilter: (property: string) => void;
}

export const useDistributionsFiltersStore = create<DistributionsFiltersState>((set) => ({
    filters: {},
    setFilters: (filters: Record<string, FilterFiql>) => set({ filters }),
    resetFilters: () => set({ filters: {} }),
    addFilter: (filter: FilterFiql) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [filter.property]: filter,
            },
        })),
    removeFilter: (property: string) =>
        set((state) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [property]: _, ...rest } = state.filters;
            return { filters: rest };
        }),
}));
