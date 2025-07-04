import { VisibleColumn } from '@/types/utils/visible-column';

export const enableAllColumnsVisibility = (columns: Record<string, VisibleColumn>): Record<string, VisibleColumn> => {
  return Object.fromEntries(Object.entries(columns).map(([key, column]) => [key, { ...column, isSelected: true }]));
};

export const transformToColumnVisibility = (columns: Record<string, VisibleColumn>): Record<string, boolean> => {
  return Object.fromEntries(Object.entries(columns).map(([id, column]) => [id, column.isSelected]));
};
