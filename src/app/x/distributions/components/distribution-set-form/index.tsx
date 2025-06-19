'use client';

import { useForm } from 'react-hook-form';
import TextArea from '@/app/components/text-area';
import Input from '@/app/components/input';
import Checkbox from '@/app/components/checkbox';
import FormControl from '@/app/components/form-control';
import { useEffect } from 'react';
import { CreateDistributionSetInput } from '@/services/distribution-sets-services.types';
import { ActionButtons } from '@/app/components/action-buttons';
import { DistributionSetType } from '@/entities/distribution-set-type';
import Select from '@/app/components/select';
import Form from '@/app/components/form';

export interface DistributionSetFormProps {
  defaultValues?: Partial<CreateDistributionSetInput>;
  distributionSetTypes: DistributionSetType[];
  onSubmit: (data: CreateDistributionSetInput) => void;
  onCancel: () => void;
}

export default function DistributionSetForm({ defaultValues, distributionSetTypes, onSubmit, onCancel }: DistributionSetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDistributionSetInput>({
    defaultValues: {
      locked: false,
      requiredMigrationStep: false,
      modules: [],
      ...defaultValues,
    },
  });

  const isEditMode = !!defaultValues;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const typeOptions = distributionSetTypes.map((type) => ({ id: type.key, label: type.name }));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id='name' label='Name' required errorMessage={errors.name?.message}>
        <Input id='name' type='text' placeholder='Enter the distribution set name' {...register('name', { required: 'This field is required' })} />
      </FormControl>

      <FormControl id='description' label='Description'>
        <TextArea id='description' placeholder='Enter the description of the entity' {...register('description')} />
      </FormControl>

      <FormControl id='version' label='Version'>
        <Input id='version' type='text' placeholder='Enter package version' {...register('version')} />
      </FormControl>

      <FormControl id='type' label='Type'>
        <Select id='type' {...register('type')} disabled={isEditMode}>
          {typeOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl id='locked'>
        <Checkbox id='locked' description='Locked' {...register('locked')} />
      </FormControl>

      <FormControl id='requiredMigrationStep'>
        <Checkbox id='requiredMigrationStep' description='Required Migration Step' {...register('requiredMigrationStep')} />
      </FormControl>

      <ActionButtons>
        <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
        <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
      </ActionButtons>
    </Form>
  );
}
