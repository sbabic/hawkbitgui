'use client';

import styles from '@/app/x/deployment/components/target-form/styles.module.scss';
import Input from '@/app/components/input';
import TextArea from '@/app/components/text-area';
import { ActionButtons } from '@/app/components/action-buttons';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export interface FormData {
  name: string;
  description: string;
  color?: string;
}

export interface TargetTagFormProps {
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
  defaultValues?: Partial<FormData>;
  mode?: 'create' | 'edit';
}

export default function TargetTagForm({ onSubmit, onCancel, defaultValues, mode = 'create' }: TargetTagFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues,
  });

  const isEditing = mode === 'edit';

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <>
      <div className={styles.container}>
        <h3>{isEditing ? 'Edit Tag' : 'Create New Tag'}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Name <b className={styles.error}>*</b>
            </label>
            <Input
              className={styles.input}
              type='text'
              placeholder='Enter the target name'
              {...register('name', { required: true })}
              error={errors.name && 'This field is required'}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Description</label>
            <TextArea placeholder='Add additional details' {...register('description')} className={styles.textarea} />
          </div>

          <ActionButtons>
            <ActionButtons.Primary type='submit'>{isEditing ? 'Update' : 'Save'}</ActionButtons.Primary>
            {onCancel && <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>}
          </ActionButtons>
        </form>
      </div>
    </>
  );
}
