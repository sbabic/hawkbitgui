'use client';

import styles from './styles.module.scss';
import Input from '@/app/components/input';
import TextArea from '@/app/components/text-area';
import { ActionButtons } from '@/app/components/action-buttons';
import { Controller, useForm } from 'react-hook-form';
import { ChromePicker } from 'react-color';
import { DistributionSetTagFormData, DistributionSetTagSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from '@/app/components/form';
import FormControl from '@/app/components/form-control';

export interface TargetTagFormProps {
  defaultValues?: Partial<DistributionSetTagFormData>;
  onSubmit: (data: DistributionSetTagFormData) => void;
  onCancel: () => void;
}

export default function DistributionSetTagForm({ onSubmit, onCancel, defaultValues }: TargetTagFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DistributionSetTagFormData>({
    defaultValues: {
      color: '#562563',
      ...defaultValues,
    },
    resolver: zodResolver(DistributionSetTagSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id='name' label='Name' required errorMessage={errors.name?.message}>
        <Input id='name' type='text' {...register('name')} />
      </FormControl>
      <FormControl id='description' label='Description' errorMessage={errors.description?.message}>
        <TextArea id='description' placeholder='Add additional details' {...register('description')} />
      </FormControl>
      <Controller
        name='color'
        control={control}
        render={({ field }) => (
          <FormControl id='color' label='Colour' errorMessage={errors.color?.message}>
            <ChromePicker
              disableAlpha={true}
              className={styles.colorPicker}
              color={field.value}
              onChange={(color) => {
                field.onChange(color.hex);
              }}
            />
          </FormControl>
        )}
      />
      <ActionButtons>
        <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
        <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
      </ActionButtons>
    </Form>
  );
}
