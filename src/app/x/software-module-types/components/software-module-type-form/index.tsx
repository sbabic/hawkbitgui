import { Controller, useForm } from 'react-hook-form';
import { ActionButtons } from '@/app/components/action-buttons';
import Form from '@/app/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SoftwareModuleTypeFormData, SoftwareModuleTypeFormSchema } from './types';
import FormControl from '@/app/components/form-control';
import Input from '@/app/components/input';
import TextArea from '@/app/components/text-area';
import { ChromePicker } from 'react-color';
import styles from './styles.module.scss';
import Tooltip from '@/app/components/tooltip';

interface SoftwareModuleFormProps {
  defaultValues?: Partial<SoftwareModuleTypeFormData>;
  onSubmit: (data: SoftwareModuleTypeFormData) => void;
  onCancel: () => void;
}

const DEFAULT_MAX_ASSIGNMENTS = 2147483647;

export default function SoftwareModuleTypeForm({ defaultValues, onSubmit, onCancel }: SoftwareModuleFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SoftwareModuleTypeFormData>({
    defaultValues: { colour: '#562563', maxAssignments: 1, ...defaultValues },
    resolver: zodResolver(SoftwareModuleTypeFormSchema),
  });

  const isEditMode = !!defaultValues;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id='name' label='Name' required errorMessage={errors.name?.message}>
        <Input id='name' type='text' placeholder='Enter the name of the module' {...register('name')} disabled={isEditMode} />
      </FormControl>
      <FormControl id='description' label='Description' errorMessage={errors.description?.message}>
        <TextArea id='description' placeholder='Enter the description' {...register('description')} />
      </FormControl>
      <FormControl id='key' label='Key' required errorMessage={errors.key?.message}>
        <Input id='key' type='text' placeholder='Enter the key of the module' {...register('key')} disabled={isEditMode} />
      </FormControl>
      <Controller
        name='maxAssignments'
        control={control}
        render={({ field }) => (
          <div className={styles.radioContainer}>
            <div className={styles.radioGroup}>
              <Tooltip content='Allows only one module per distribution set'>
                <label className={styles.radioLabel}>
                  <input type='radio' checked={field.value === 1} onChange={() => field.onChange(1)} className={styles.radioInput} />
                  <span className={styles.radioCustom}></span>
                  <span className={styles.label}>Firmware (FW)</span>
                </label>
              </Tooltip>

              <Tooltip content='Allows multiple modules per distribution set'>
                <label className={styles.radioLabel}>
                  <input type='radio' checked={field.value !== 1} onChange={() => field.onChange(DEFAULT_MAX_ASSIGNMENTS)} className={styles.radioInput} />
                  <span className={styles.radioCustom}></span>
                  <span className={styles.label}>Software (SW)</span>
                </label>
              </Tooltip>
            </div>
          </div>
        )}
      />

      <Controller
        name='colour'
        control={control}
        render={({ field }) => (
          <FormControl id='colour' label='Colour' errorMessage={errors.colour?.message}>
            <ChromePicker
              disableAlpha={true}
              className={styles.colorPicker}
              color={field.value}
              onChange={(color) => {
                field.onChange(color.hex);
              }}
            />
          </FormControl>
        )}
      />
      <ActionButtons>
        <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
        <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
      </ActionButtons>
    </Form>
  );
}
