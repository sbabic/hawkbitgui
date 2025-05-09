'use client';

import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import styles from './styles.module.scss';
import Input from '@/app/components/input';
import Select from '@/app/components/select';
import FormControl from '@/app/components/form-control';
import RadioGroup from '@/app/components/radio-group';
import TextArea from '@/app/components/text-area';
import { RolloutTypes, StartType } from '@/entities/rollout';
import { Distribution } from '@/entities';
import { ActionButtons } from '@/app/components/action-buttons';
import ThunderCloudIcon from '@/app/components/icons/thunder-cloud-icon';
import CloudIcon from '@/app/components/icons/cloud-icon';
import DownloadIcon from '@/app/components/icons/download-icon';
import ClockCloudIcon from '@/app/components/icons/clock-cloud-icon';
import DateTimePicker from '@/app/components/datetime-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import TouchIcon from '@/app/components/icons/touch-icon';
import ClockIcon from '@/app/components/icons/clock-icon';
import PlayCircleIcon from '@/app/components/icons/play-circle-icon';
import RolloutGroupsTable from './components/rollout-groups-table';
import { CreateRolloutFormData, CreateRolloutFormSchema } from './types';

type CreateRolloutFormProps = {
  distributionSets: Distribution[];
  onSubmit: (data: CreateRolloutFormData) => void;
  onCancel: () => void;
};

export default function CreateRolloutForm({ distributionSets, onSubmit, onCancel }: CreateRolloutFormProps) {
  const [activeTab, setActiveTab] = useState<'numberOfGroups' | 'advancedDefinition'>('numberOfGroups');

  const formMethods = useForm<CreateRolloutFormData>({
    defaultValues: {
      type: RolloutTypes.FORCED,
      startType: StartType.MANUAL,
    },
    resolver: zodResolver(CreateRolloutFormSchema),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    resetField,
  } = formMethods;

  const actionType = watch('type');
  const startType = watch('startType');
  const actionTypeOptions = [
    { id: RolloutTypes.FORCED, label: 'Forced', icon: <ThunderCloudIcon /> },
    { id: RolloutTypes.SOFT, label: 'Soft', icon: <CloudIcon /> },
    { id: RolloutTypes.DOWNLOAD_ONLY, label: 'Download only', icon: <DownloadIcon /> },
    { id: RolloutTypes.TIME_FORCED, label: 'Time forced', icon: <ClockCloudIcon /> },
  ];

  const startTypeOptions = [
    { id: StartType.MANUAL, label: 'Manual', icon: <TouchIcon width={20} height={20} /> },
    { id: StartType.AUTO, label: 'Auto', icon: <PlayCircleIcon width={20} height={20} /> },
    { id: StartType.SCHEDULED, label: 'Scheduled', icon: <ClockIcon width={20} height={20} /> },
  ];

  return (
    <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}>
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <FormControl id='startType' label='Start type' errorMessage={errors.startType?.message} required>
          <Controller
            name='startType'
            control={control}
            render={({ field }) => <RadioGroup value={field.value ?? ''} options={startTypeOptions} onChange={field.onChange} />}
          />
        </FormControl>
        {startType === StartType.SCHEDULED && (
          <FormControl id='startAt' errorMessage={errors.startAt?.message}>
            <Controller control={control} name='startAt' render={({ field }) => <DateTimePicker {...field} />} />
          </FormControl>
        )}
      </div>

      <div className={styles.tabGroup}>
        <div className={styles.tabs}>
          <button
            type='button'
            className={`${styles.tab} ${activeTab === 'numberOfGroups' ? styles.activeTab : ''}`}
            onClick={() => {
              setActiveTab('numberOfGroups');
              resetField('groups');
            }}
          >
            Number of groups
          </button>
          <button
            type='button'
            className={`${styles.tab} ${activeTab === 'advancedDefinition' ? styles.activeTab : ''}`}
            onClick={() => {
              setActiveTab('advancedDefinition');
              resetField('amountGroups');
            }}
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
              <p>Define which groups the Rollout should have.</p>
              <FormProvider {...formMethods}>
                <RolloutGroupsTable />
              </FormProvider>
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
