'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { CreateRolloutFormData } from '../types';
import FormControl from '@/app/components/form-control';
import Select from '@/app/components/select';
import { TargetFilter } from '@/entities/target-filter';
import { useQueryClient } from '@tanstack/react-query';
import { TargetsService } from '@/services/targets-service';

interface SelectTargetFilterContainerProps {
  targetFilters: TargetFilter[];
  disabled?: boolean;
  onSelectedTargetsChange: (targetsCount: number) => void;
}

export function SelectTargetFilterContainer({ targetFilters, disabled = false, onSelectedTargetsChange }: SelectTargetFilterContainerProps) {
  const queryClient = useQueryClient();

  const {
    control,
    formState: { errors },
  } = useFormContext<CreateRolloutFormData>();

  const handleSelectTargetFilterQuery = async (targetFilterQuery: string) => {
    if (!targetFilterQuery) return;
    try {
      const { totalTargets } = await queryClient.fetchQuery({
        queryKey: ['targets', targetFilterQuery, 'count'],
        queryFn: () => TargetsService.fetchTargets({ queryParams: { query: targetFilterQuery, offset: 0, limit: 1 }, filters: [] }),
      });
      if (totalTargets) {
        onSelectedTargetsChange(totalTargets);
      }
    } catch {
      return;
    }
  };

  return (
    <FormControl id='targetFilterId' label='Target filter' errorMessage={errors.targetFilterQuery?.message ?? errors.selectedTargetsCount?.message} required>
      <Controller
        name='targetFilterQuery'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            disabled={disabled}
            onChange={(e) => {
              field.onChange(e.target.value);
              handleSelectTargetFilterQuery(e.target.value);
            }}
          >
            <option value=''>Choose a target filter</option>
            {targetFilters.map((targetFilter) => (
              <option key={targetFilter.query} value={targetFilter.query}>
                {targetFilter.name}
              </option>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
