import { useForm } from 'react-hook-form';
import FormControl from '@/app/components/form-control';
import Input from '@/app/components/input';
import TextArea from '@/app/components/text-area';
import { ActionButtons } from '@/app/components/action-buttons';
import Checkbox from '@/app/components/checkbox';
import Form from '@/app/components/form';
import { SoftwareModuleType } from '@/entities/software-module-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSoftwareModuleFormData, CreateSoftwareModuleSchema } from './types';
import Select from '@/app/components/select';

interface SoftwareModuleFormProps {
  defaultValues?: Partial<CreateSoftwareModuleFormData>;
  softwareModuleTypes: SoftwareModuleType[];
  onSubmit: (data: CreateSoftwareModuleFormData) => void;
  onCancel: () => void;
}

export default function SoftwareModuleFormContainer({ defaultValues, softwareModuleTypes, onSubmit, onCancel }: SoftwareModuleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSoftwareModuleFormData>({
    defaultValues: { ...defaultValues },
    resolver: zodResolver(CreateSoftwareModuleSchema),
  });

  const isEditMode = !!defaultValues;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id='type' label='Type' required errorMessage={errors.type?.message}>
        <Select id='type' {...register('type')} disabled={isEditMode}>
          <option value=''>Select a type</option>
          {softwareModuleTypes.map((type) => (
            <option key={type.key} value={type.key}>
              {type.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl id='name' label='Name' required errorMessage={errors.name?.message}>
        <Input id='name' type='text' placeholder='Enter the name of the module' {...register('name')} disabled={isEditMode} />
      </FormControl>
      <FormControl id='version' label='Version' required errorMessage={errors.version?.message}>
        <Input id='version' type='text' placeholder='Enter the version' {...register('version')} disabled={isEditMode} />
      </FormControl>
      <FormControl id='description' label='Description'>
        <TextArea id='description' placeholder='Enter the description' {...register('description')} />
      </FormControl>
      <FormControl id='vendor' label='Vendor'>
        <Input id='vendor' type='text' placeholder='Enter the vendor' {...register('vendor')} />
      </FormControl>
      <FormControl id='encrypted'>
        <Checkbox id='encrypted' description='Encrypted' {...register('encrypted')} disabled={isEditMode} />
      </FormControl>
      <ActionButtons>
        <ActionButtons.Primary type='submit'>{isSubmitting ? 'Creating...' : 'Create'}</ActionButtons.Primary>
        <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
      </ActionButtons>
    </Form>
  );
}
