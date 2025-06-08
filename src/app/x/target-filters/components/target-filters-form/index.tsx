import { Controller, useForm } from 'react-hook-form';
import FormControl from '@/app/components/form-control';
import Input from '@/app/components/input';
import Form from '@/app/components/form';
import styles from './styles.module.scss';
import { useCallback, useMemo } from 'react';
import { debounce } from 'lodash-es';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTargetFilterFormData, CreateTargetFilterSchema } from './types';
import Button from '@/app/components/button';

interface TargetFiltersFormProps {
  defaultValues?: CreateTargetFilterFormData;
  onSubmit: (data: CreateTargetFilterFormData) => void;
  onQueryChange: (query: string) => void;
}

export default function TargetFiltersForm({ defaultValues, onSubmit, onQueryChange }: TargetFiltersFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTargetFilterFormData>({
    defaultValues: {
      name: defaultValues?.name ?? '',
      query: defaultValues?.query ?? '',
    },
    resolver: zodResolver(CreateTargetFilterSchema),
  });

  const debouncedQueryChange = useMemo(() => debounce(onQueryChange, 500), [onQueryChange]);
  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedQueryChange(e.target.value);
    },
    [debouncedQueryChange]
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <p className={styles.label}>
          Name<span className={styles.required}>*</span>
        </p>
        <div className={styles.inputContainer}>
          <FormControl id='name' required errorMessage={errors.name?.message}>
            <Input id='name' type='text' placeholder='Enter the name of the filter' {...register('name', { required: 'This field is required' })} />
          </FormControl>
        </div>
      </div>

      <div className={styles.formGroup}>
        <p className={styles.label}>
          Query<span className={styles.required}>*</span>
        </p>
        <div className={styles.inputContainer}>
          <Controller
            control={control}
            name='query'
            render={({ field }) => (
              <FormControl id='query' required errorMessage={errors.query?.message}>
                <Input
                  id='query'
                  type='text'
                  placeholder='Enter the query'
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleQueryChange(e);
                  }}
                />
              </FormControl>
            )}
          />
        </div>
        <Button variant='outline' type='submit' disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </Form>
  );
}
