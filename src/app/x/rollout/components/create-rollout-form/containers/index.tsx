'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { CreateRolloutFormData } from '../types';
import FormControl from '@/app/components/form-control';
import Select from '@/app/components/select';
import { TargetFilter } from '@/entities/target-filter';
import { useEffect, useState } from 'react';
import { useGetTargets } from '@/app/x/deployment/hooks/use-get-targets';

interface SelectTargetFilterContainerProps {
  targetFilters: TargetFilter[];
  onSelectedTargetsChange: (targetsCount: number) => void;
}

export function SelectTargetFilterContainer({ targetFilters, onSelectedTargetsChange }: SelectTargetFilterContainerProps) {
  const [targetFilterQuery, setTargetFilterQuery] = useState<string | undefined>(undefined);
  const { data: selectedTargets } = useGetTargets({
    queryParams: { q: targetFilterQuery },
    queryOptions: { enabled: !!targetFilterQuery },
  });

  const {
    control,
    formState: { errors },
  } = useFormContext<CreateRolloutFormData>();

  useEffect(() => {
    if (selectedTargets) {
      onSelectedTargetsChange(selectedTargets.total);
      setTargetFilterQuery(undefined);
    }
  }, [selectedTargets, onSelectedTargetsChange]);

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
            onChange={(e) => {
              field.onChange(e.target.value);
              handleSelectTargetFilterQuery(e.target.value);
            }}
          >
            <option value=''>Choose a target filter</option>
            {targetFilters.map((targetFilter) => (
              <option key={targetFilter.id} value={targetFilter.query}>
                {targetFilter.name}
              </option>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
