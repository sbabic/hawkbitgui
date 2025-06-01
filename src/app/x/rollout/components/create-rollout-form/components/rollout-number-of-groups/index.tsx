'use client';

import React from 'react';
import Input from '@/app/components/input';
import FormControl from '@/app/components/form-control';
import { Controller, useFormContext } from 'react-hook-form';
import styles from './styles.module.scss';
import { CreateRolloutFormData } from '../../types';
import { Condition } from '@/services/rollouts-service.types';

export default function RolloutNumberOfGroups() {
  const {
    control,
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<CreateRolloutFormData>();

  const isErrorCount = watch('isErrorCount');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
      <FormControl id='amountGroups' label='Number of groups' errorMessage={errors.amountGroups?.message} required>
        <Input
          id='amountGroups'
          placeholder='Enter group count'
          type='number'
          {...register('amountGroups', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
      </FormControl>

      <FormControl id='successCondition' label='Trigger threshold' errorMessage={errors.successCondition?.expression?.message}>
        <Controller
          control={control}
          name='successCondition'
          render={({ field }) => (
            <Input
              id='successCondition'
              placeholder='Enter trigger value (%)'
              type='number'
              onChange={(e) => {
                field.onChange({ condition: Condition.THRESHOLD, expression: Number(e.target.value) });
              }}
            />
          )}
        />
      </FormControl>

      <Controller
        control={control}
        name='errorCondition'
        render={({ field }) => (
          <div style={{ position: 'relative' }}>
            <FormControl id='errorCondition' label='Error threshold' errorMessage={errors.errorCondition?.expression?.message}>
              <Input
                id='errorCondition'
                placeholder='Enter max errors'
                type='number'
                onChange={(e) => {
                  field.onChange({ condition: Condition.THRESHOLD, expression: Number(e.target.value) });
                }}
              />
            </FormControl>
            <div className={styles.radioContainer}>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input type='radio' checked={!isErrorCount} onChange={() => setValue('isErrorCount', false)} className={styles.radioInput} />
                  <span className={styles.radioCustom}></span>
                  <span className={styles.label}>%</span>
                </label>

                <label className={styles.radioLabel}>
                  <input type='radio' checked={isErrorCount} onChange={() => setValue('isErrorCount', true)} className={styles.radioInput} />
                  <span className={styles.radioCustom}></span>
                  <span className={styles.label}>Count</span>
                </label>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
