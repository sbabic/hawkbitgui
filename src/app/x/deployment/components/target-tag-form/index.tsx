'use client';

import styles from './styles.module.scss';
import Input from '@/app/components/input';
import TextArea from '@/app/components/text-area';
import { ActionButtons } from '@/app/components/action-buttons';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import Text from '@/app/components/text';

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
    setValue,
  } = useForm<FormData>({
    values: defaultValues as FormData | undefined,
  });

  const [color, setColor] = useState<string>(defaultValues?.color ?? '#FFFFFF');
  const [prevDefaultColor, setPrevDefaultColor] = useState(defaultValues?.color);
  if (defaultValues?.color !== prevDefaultColor) {
    setPrevDefaultColor(defaultValues?.color);
    if (defaultValues?.color) setColor(defaultValues.color);
  }

  const isEditing = mode === 'edit';

  return (
    <>
      <div className={styles.container}>
        <Text variant='heading-2'>{isEditing ? 'Edit Tag' : 'Create New Tag'}</Text>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Name <b className={styles.error}>*</b>
            </label>
            <Input
              className={styles.input}
              type='text'
              placeholder='Enter the tag name'
              {...register('name', { required: true })}
              error={errors.name && 'This field is required'}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Description</label>
            <TextArea placeholder='Add additional details' {...register('description')} className={styles.textarea} />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Color</label>
            <ChromePicker
              disableAlpha={true}
              className={styles.colorPicker}
              color={color}
              onChange={(color) => {
                setColor(color.hex);
                setValue('color', color.hex);
              }}
            />
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
