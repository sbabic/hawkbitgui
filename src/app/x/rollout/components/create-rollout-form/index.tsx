'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './styles.module.scss';
import Input from '@/app/components/input';
import Select from '@/app/components/select';
import FormControl from '@/app/components/form-control';
import RadioGroup from '@/app/components/radio-group';
import TextArea from '@/app/components/text-area';
import { RolloutTypes } from '@/entities/rollout';
import { Distribution } from '@/entities';
import { Condition, CreateRolloutInput } from '@/services/rollouts-service.types';
import { ActionButtons } from '@/app/components/action-buttons';
import ThunderCloudIcon from '@/app/components/icons/thunder-cloud-icon';
import CloudIcon from '@/app/components/icons/cloud-icon';
import DownloadIcon from '@/app/components/icons/download-icon';
import ClockCloudIcon from '@/app/components/icons/clock-cloud-icon';
import DateTimePicker from '@/app/components/datetime-picker';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type CreateRolloutFormProps = {
  distributionSets: Distribution[];
  onSubmit: (data: CreateRolloutInput) => void;
  onCancel: () => void;
};

const CreateRolloutFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    distributionSetId: z.number({ message: 'Distribution set is required' }).min(1, { message: 'Distribution set is required' }),
    targetFilterQuery: z.string().min(1, { message: 'Custom target filter is required' }),
    description: z.string().optional(),
    type: z.nativeEnum(RolloutTypes, { message: 'Action type is required' }),
    forcetime: z.date().optional(),
    amountGroups: z.number({ message: 'Number of groups is required' }).min(1, { message: 'Number of groups is required' }),
    successCondition: z
      .object({
        condition: z.literal(Condition.THRESHOLD),
        expression: z.number().int({ message: 'Trigger threshold must be a whole number' }).min(1, { message: 'Trigger threshold must be greater than 0' }),
      })
      .optional(),
    errorCondition: z
      .object({
        condition: z.literal(Condition.THRESHOLD),
        expression: z.number().min(1, { message: 'Error threshold must be greater than 0' }),
      })
      .optional(),
  })
  .refine((data) => !(data.type === RolloutTypes.TIME_FORCED && !data.forcetime), {
    message: 'Forced action requires a forced time',
    path: ['forcetime'],
  });
export type CreateRolloutFormData = z.infer<typeof CreateRolloutFormSchema>;

export default function CreateRolloutForm({ distributionSets, onSubmit, onCancel }: CreateRolloutFormProps) {
  const [activeTab, setActiveTab] = useState<'numberOfGroups' | 'advancedDefinition'>('numberOfGroups');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CreateRolloutFormData>({
    resolver: zodResolver(CreateRolloutFormSchema),
  });

  const actionType = watch('type');

  const actionTypeOptions = [
    { id: RolloutTypes.FORCED, label: 'Forced', icon: <ThunderCloudIcon /> },
    { id: RolloutTypes.SOFT, label: 'Soft', icon: <CloudIcon /> },
    { id: RolloutTypes.DOWNLOAD_ONLY, label: 'Download only', icon: <DownloadIcon /> },
    { id: RolloutTypes.TIME_FORCED, label: 'Time forced', icon: <ClockCloudIcon /> },
  ];

  const submit = (data: CreateRolloutFormData) => {
    if (data.type !== RolloutTypes.TIME_FORCED && data.forcetime) {
      data.forcetime = undefined;
    }
    const createRolloutInput = mapFormDataToCreateRolloutInput(data);
    onSubmit(createRolloutInput);
  };

  const mapFormDataToCreateRolloutInput = (data: CreateRolloutFormData): CreateRolloutInput => {
    return {
      ...data,
      forcetime: data.forcetime ? data.forcetime.getTime() : undefined,
      successCondition: data.successCondition
        ? {
            ...data.successCondition,
            expression: data.successCondition.expression.toString(),
          }
        : undefined,
      errorCondition: data.errorCondition
        ? {
            ...data.errorCondition,
            expression: data.errorCondition.expression.toString(),
          }
        : undefined,
    };
  };

  return (
    <form className={styles.formContent} onSubmit={handleSubmit(submit)}>
      <div className={styles.threeColumns}>
        <FormControl id='name' label='Name' errorMessage={errors.name?.message} required>
          <Input id='name' placeholder='Enter rollout name' {...register('name', { required: 'Name is required' })} />
        </FormControl>

        <FormControl id='distributionSetId' label='Distribution set' errorMessage={errors.distributionSetId?.message} required>
          <Select {...register('distributionSetId', { valueAsNumber: true })} className={styles.select}>
            <option value=''>Choose a distribution set</option>
            {distributionSets.map((distributionSet) => (
              <option key={distributionSet.id} value={distributionSet.id}>
                {distributionSet.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id='customTargetFilter' label='Custom target filter' errorMessage={errors.targetFilterQuery?.message} required>
          <Select {...register('targetFilterQuery')} className={styles.select}>
            <option value=''>Choose a custom target filter</option>
            <option value='id==test*'>id==test*</option>
          </Select>
        </FormControl>
      </div>

      <FormControl id='description' label='Description' errorMessage={errors.description?.message}>
        <TextArea id='description' placeholder='Add additional details' {...register('description')} />
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <FormControl id='type' label='Action type' errorMessage={errors.type?.message} required>
          <Controller
            name='type'
            control={control}
            render={({ field }) => <RadioGroup value={field.value ?? ''} options={actionTypeOptions} onChange={field.onChange} />}
          />
        </FormControl>
        {actionType === RolloutTypes.TIME_FORCED && (
          <FormControl id='forcetime' errorMessage={errors.forcetime?.message}>
            <Controller control={control} name='forcetime' render={({ field }) => <DateTimePicker {...field} />} />
          </FormControl>
        )}
      </div>

      <div className={styles.tabGroup}>
        <div className={styles.tabs}>
          <button
            type='button'
            className={`${styles.tab} ${activeTab === 'numberOfGroups' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('numberOfGroups')}
          >
            Number of groups
          </button>
          <button
            type='button'
            className={`${styles.tab} ${activeTab === 'advancedDefinition' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('advancedDefinition')}
          >
            Advanced group definition
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'numberOfGroups' && (
            <>
              <p className={styles.tabDescription}>Generate the groups automatically with the specified thresholds.</p>

              <div className={styles.threeColumns}>
                <FormControl id='amountGroups' label='Number of groups' errorMessage={errors.amountGroups?.message} required>
                  <Input id='amountGroups' placeholder='Enter group count' type='number' {...register('amountGroups', { valueAsNumber: true })} />
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
                          field.onChange({ condition: 'THRESHOLD', expression: Number(e.target.value) });
                        }}
                      />
                    )}
                  />
                </FormControl>

                <FormControl id='errorCondition' label='Error threshold' errorMessage={errors.errorCondition?.expression?.message}>
                  <Controller
                    control={control}
                    name='errorCondition'
                    render={({ field }) => (
                      <Input
                        id='errorCondition'
                        placeholder='Enter max errors'
                        type='number'
                        onChange={(e) => {
                          field.onChange({ condition: 'THRESHOLD', expression: Number(e.target.value) });
                        }}
                      />
                    )}
                  />
                </FormControl>
              </div>
            </>
          )}

          {activeTab === 'advancedDefinition' && (
            <div className={styles.tabDescription}>
              <p>Advanced group configuration options will be available here.</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.errorMessage}>Mandatory field*</div>

      <ActionButtons>
        <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
        <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
      </ActionButtons>
    </form>
  );
}
