'use client';

import React, { useEffect } from 'react';
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
import RolloutNumberOfGroups from './components/rollout-number-of-groups';
import Form from '@/app/components/form';
import { TargetFilter } from '@/entities/target-filter';
import { SelectTargetFilterContainer } from './containers';

type CreateRolloutFormProps = {
  defaultValues?: CreateRolloutFormData;
  type?: 'create' | 'edit';
  distributionSets: Distribution[];
  targetFilters: TargetFilter[];
  onSubmit: (data: CreateRolloutFormData) => void;
  onCancel: () => void;
};

export default function CreateRolloutForm({ defaultValues, type = 'create', distributionSets, targetFilters, onSubmit, onCancel }: CreateRolloutFormProps) {
  const formMethods = useForm<CreateRolloutFormData>({
    defaultValues: {
      type: RolloutTypes.FORCED,
      startType: StartType.MANUAL,
      isErrorCount: false,
      groupsSettings: 'numberOfGroups',
      amountGroups: 1,
      errorCondition: {
        condition: 'THRESHOLD',
        expression: 50,
      },
      successCondition: {
        condition: 'THRESHOLD',
        expression: 50,
      },
      ...defaultValues,
    },
    resolver: zodResolver(CreateRolloutFormSchema),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    trigger,
    reset,
  } = formMethods;

  useEffect(() => {
    if (defaultValues) {
      reset({ ...defaultValues, groupsSettings: defaultValues.groups ? 'advancedDefinition' : 'numberOfGroups' });
    }
  }, [defaultValues, reset]);

  const isEdit = type === 'edit';
  const groupsSettings = watch('groupsSettings');
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

  const handleSelectedTargetsChange = (targetsCount: number) => {
    setValue('selectedTargetsCount', targetsCount);
    trigger('selectedTargetsCount');
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <FormControl id='name' label='Name' errorMessage={errors.name?.message} required>
            <Input id='name' placeholder='Enter rollout name' {...register('name', { required: 'Name is required' })} />
          </FormControl>

          <FormControl id='distributionSetId' label='Distribution set' errorMessage={errors.distributionSetId?.message} required>
            <Select disabled={isEdit} {...register('distributionSetId', { valueAsNumber: true })}>
              <option value=''>Choose a distribution set</option>
              {distributionSets.map((distributionSet) => (
                <option key={distributionSet.id} value={distributionSet.id}>
                  {distributionSet.name}: {distributionSet.version}
                </option>
              ))}
            </Select>
          </FormControl>

          <SelectTargetFilterContainer disabled={isEdit} targetFilters={targetFilters} onSelectedTargetsChange={handleSelectedTargetsChange} />
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
              <Controller control={control} name='forcetime' render={({ field }) => <DateTimePicker initialDate={field.value} onChange={field.onChange} />} />
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
              <Controller control={control} name='startAt' render={({ field }) => <DateTimePicker initialDate={field.value} onChange={field.onChange} />} />
            </FormControl>
          )}
        </div>

        {!isEdit && (
          <div className={styles.tabGroup}>
            <div className={styles.tabs}>
              <button
                type='button'
                className={`${styles.tab} ${groupsSettings === 'numberOfGroups' ? styles.activeTab : ''}`}
                onClick={() => {
                  setValue('groupsSettings', 'numberOfGroups');
                }}
              >
                Number of groups
              </button>
              <button
                type='button'
                className={`${styles.tab} ${groupsSettings === 'advancedDefinition' ? styles.activeTab : ''}`}
                onClick={() => {
                  setValue('groupsSettings', 'advancedDefinition');
                }}
              >
                Advanced group definition
              </button>
            </div>

            <div className={styles.tabContent}>
              {groupsSettings === 'numberOfGroups' && (
                <>
                  <p className={styles.tabDescription}>Generate the groups automatically with the specified thresholds.</p>
                  <RolloutNumberOfGroups />
                </>
              )}

              {groupsSettings === 'advancedDefinition' && (
                <>
                  <p className={styles.tabDescription}>Define which groups the Rollout should have.</p>
                  <RolloutGroupsTable />
                </>
              )}
            </div>
          </div>
        )}

        <div className={styles.errorMessage}>Mandatory field*</div>

        <ActionButtons>
          <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
          <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
        </ActionButtons>
      </Form>
    </FormProvider>
  );
}
