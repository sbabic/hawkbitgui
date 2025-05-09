import { useForm } from 'react-hook-form';
import FormControl from '@/app/components/form-control';
import Input from '@/app/components/input';
import { ActionButtons } from '@/app/components/action-buttons';
import Form from '@/app/components/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTargetFilterFormData, CreateTargetFilterSchema } from './types';

interface TargetFiltersFormProps {
  onSubmit: (data: CreateTargetFilterFormData) => void;
  onCancel: () => void;
}

export default function TargetFiltersForm({ onSubmit, onCancel }: TargetFiltersFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTargetFilterFormData>({
    defaultValues: {
      name: '',
      query: '',
    },
    resolver: zodResolver(CreateTargetFilterSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id='name' label='Name' required errorMessage={errors.name?.message}>
        <Input id='name' type='text' placeholder='Enter the name of the filter' {...register('name', { required: 'This field is required' })} />
      </FormControl>
      <FormControl id='query' label='Query' required errorMessage={errors.query?.message}>
        <Input id='query' type='text' placeholder='Enter the query' {...register('query', { required: 'This field is required' })} />
      </FormControl>
      <ActionButtons>
        <ActionButtons.Primary type='submit'>{isSubmitting ? 'Creating...' : 'Create'}</ActionButtons.Primary>
        <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
      </ActionButtons>
    </Form>
  );
}
