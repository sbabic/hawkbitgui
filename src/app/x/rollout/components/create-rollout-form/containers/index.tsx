'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { CreateRolloutFormData } from '../types';
import FormControl from '@/app/components/form-control';
import Select from '@/app/components/select';
import { TargetFilter } from '@/entities/target-filter';
import { useEffect, useState } from 'react';
import { useGetPaginatedTargets } from '@/app/x/deployment/hooks/use-get-paginated-targets';

interface SelectTargetFilterContainerProps {
  targetFilters: TargetFilter[];
  disabled?: boolean;
  onSelectedTargetsChange: (targetsCount: number) => void;
}

export function SelectTargetFilterContainer({ targetFilters, disabled = false, onSelectedTargetsChange }: SelectTargetFilterContainerProps) {
  const [targetFilterQuery, setTargetFilterQuery] = useState<string | undefined>(undefined);
  const { data: selectedTargetsData } = useGetPaginatedTargets({
    queryParams: { q: targetFilterQuery },
    queryOptions: { enabled: !!targetFilterQuery },
  });
  const { totalTargets: selectedTargetsCount } = selectedTargetsData ?? {};

  const {
    control,
    formState: { errors },
  } = useFormContext<CreateRolloutFormData>();

  const [prevHandledCount, setPrevHandledCount] = useState<number | undefined>(undefined);
  if (selectedTargetsCount !== undefined && selectedTargetsCount !== prevHandledCount) {
    setPrevHandledCount(selectedTargetsCount);
    setTargetFilterQuery(undefined);
  }

  useEffect(() => {
    if (selectedTargetsCount) {
      onSelectedTargetsChange(selectedTargetsCount);
    }
  }, [selectedTargetsCount, onSelectedTargetsChange]);

  const handleSelectTargetFilterQuery = (targetFilterQuery: string) => {
    setTargetFilterQuery(targetFilterQuery);
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
