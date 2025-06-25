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

interface SoftwareModuleFormProps {
  defaultValues?: Partial<SoftwareModuleTypeFormData>;
  onSubmit: (data: SoftwareModuleTypeFormData) => void;
  onCancel: () => void;
}

export default function SoftwareModuleTypeForm({ defaultValues, onSubmit, onCancel }: SoftwareModuleFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SoftwareModuleTypeFormData>({
    defaultValues: { maxAssignments: 1, colour: '#562563', ...defaultValues },
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
