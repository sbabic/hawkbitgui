'use client';

import { useForm } from 'react-hook-form';
import TextArea from '@/app/components/text-area';
import Input from '@/app/components/input';
import FormControl from '@/app/components/form-control';
import { useEffect } from 'react';
import { CreateDistributionSetTypeInput } from '@/services/distribution-set-types-service.types';
import { ActionButtons } from '@/app/components/action-buttons';
import Form from '@/app/components/form';

export interface DistributionSetTypeFormProps {
  defaultValues?: Partial<CreateDistributionSetTypeInput>;
  mode?: 'create' | 'edit';
  onSubmit: (data: CreateDistributionSetTypeInput) => void;
  onCancel: () => void;
}

export default function DistributionSetTypeForm({ onSubmit, onCancel, defaultValues }: DistributionSetTypeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDistributionSetTypeInput>({
    defaultValues: {
      mandatorymodules: [],
      optionalmodules: [],
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id='name' label='Name' required errorMessage={errors.name?.message}>
        <Input id='name' type='text' placeholder='Enter the name of the entity' {...register('name', { required: 'This field is required' })} />
      </FormControl>

      <FormControl id='description' label='Description'>
        <TextArea id='description' placeholder='Enter the description of the entity' {...register('description')} />
      </FormControl>

      <FormControl id='colour' label='Colour'>
        <Input id='colour' type='text' placeholder='Enter the colour of the entity' {...register('colour')} />
      </FormControl>

      <FormControl id='key' label='Key' required errorMessage={errors.key?.message}>
        <Input id='key' type='text' placeholder='Enter the functional key' {...register('key', { required: 'This field is required' })} />
      </FormControl>

      <ActionButtons>
        <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
        <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
      </ActionButtons>
    </Form>
  );
}
