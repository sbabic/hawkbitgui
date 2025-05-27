'use client';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import Button from '@/app/components/button';
import Input from '../input';
import TextArea from '@/app/components/text-area';

interface FormData {
  key: string;
  value: string;
}

export default function CreateMetadataForm({ onSubmit, onCancel }: { onSubmit: (data: FormData) => void; onCancel?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <div className={styles.container}>
      <h3>Create Metadata</h3>
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
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Value</label>
          <TextArea placeholder={'Key'} {...register('value')} className={styles.textarea} error={errors.value && 'This field is required'} />
        </div>

        <div className={styles.buttonContainer}>
          <Button type='submit'>Save</Button>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
