import Form from '@/app/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { AutoAssignDistributionFormData, AutoAssignDistributionSchema } from './types';
import Checkbox from '@/app/components/checkbox';
import FormControl from '@/app/components/form-control';
import { Distribution } from '@/entities';
import Select from '@/app/components/select';
import RadioGroup from '@/app/components/radio-group';
import { RolloutTypes } from '@/entities/rollout';
import ThunderCloudIcon from '@/app/components/icons/thunder-cloud-icon';
import CloudIcon from '@/app/components/icons/cloud-icon';
import DownloadIcon from '@/app/components/icons/download-icon';
import styles from './styles.module.scss';
import { ActionButtons } from '@/app/components/action-buttons';

interface AutoAssignDistributionFormProps {
  defaultValues: AutoAssignDistributionFormData;
  distributionSets: Distribution[];
  onSubmit: (data: AutoAssignDistributionFormData) => void;
  onCancel: () => void;
}

export default function AutoAssignDistributionForm({ defaultValues, distributionSets, onSubmit, onCancel }: AutoAssignDistributionFormProps) {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      ...defaultValues,
      autoAssignActionType: defaultValues.autoAssignActionType ?? RolloutTypes.FORCED,
    },
    resolver: zodResolver(AutoAssignDistributionSchema),
  });

  const enableAutoAssign = watch('enableAutoAssign');

  const actionTypeOptions = [
    { id: RolloutTypes.FORCED, label: 'Forced', icon: <ThunderCloudIcon /> },
    { id: RolloutTypes.SOFT, label: 'Soft', icon: <CloudIcon /> },
    { id: RolloutTypes.DOWNLOAD_ONLY, label: 'Download only', icon: <DownloadIcon /> },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.description}>
        When an auto assign distribution set is selected, it will be automatically assigned to all targets that match the target filter.
      </p>
      <Controller
        name='enableAutoAssign'
        control={control}
        render={({ field }) => (
          <Checkbox
            id='enableAutoAssign'
            description='Enable auto assignment'
            checked={field.value ?? false}
            onChange={() => {
              const newValue = !field.value;
              field.onChange(newValue);
              if (!newValue) {
                setValue('autoAssignActionType', undefined);
                setValue('autoAssignDistributionSet', undefined);
              }
            }}
          />
        )}
      />

      {enableAutoAssign && (
        <>
          <FormControl id='autoAssignActionType' errorMessage={errors.autoAssignActionType?.message}>
            <Controller
              name='autoAssignActionType'
              control={control}
              render={({ field }) => <RadioGroup value={field.value ?? ''} options={actionTypeOptions} onChange={field.onChange} />}
            />
          </FormControl>

          <FormControl id='autoAssignDistributionSet' label='Distribution set' errorMessage={errors.autoAssignDistributionSet?.message} required>
            <Select {...register('autoAssignDistributionSet', { valueAsNumber: true })}>
              <option value=''>Choose a distribution set</option>
              {distributionSets.map((distributionSet) => (
                <option key={distributionSet.id} value={distributionSet.id}>
                  {distributionSet.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      <ActionButtons>
        <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
        <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
      </ActionButtons>
    </Form>
  );
}
