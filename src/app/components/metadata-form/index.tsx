'use client';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import Button from '@/app/components/button';
import Input from '../input';
import TextArea from '@/app/components/text-area';

export interface FormData {
  key: string;
  value: string;
}

interface CreateMetadataFormProps {
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
  defaultValues?: Partial<FormData>;
  mode?: 'create' | 'edit';
}

export default function CreateMetadataForm({ onSubmit, onCancel, defaultValues, mode = 'create' }: CreateMetadataFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      key: defaultValues?.key ?? '',
      value: defaultValues?.value ?? '',
    },
  });

  const isEditMode = mode === 'edit';

  return (
    <div className={styles.container}>
      <h3>{isEditMode ? 'Edit Metadata' : 'Create Metadata'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>
            Key <b className={styles.error}>*</b>
          </label>
          <Input
            className={styles.input}
            type='text'
            placeholder='Key'
            {...register('key', { required: true })}
            error={errors.key && 'This field is required'}
            disabled={isEditMode} // Optional: lock key on edit
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Value</label>
          <TextArea placeholder='Value' {...register('value')} className={styles.textarea} error={errors.value && 'This field is required'} />
        </div>

        <div className={styles.buttonContainer}>
          <Button type='submit'>{isEditMode ? 'Update' : 'Save'}</Button>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
