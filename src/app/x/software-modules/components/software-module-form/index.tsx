import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CreateSoftwareModuleInput } from '@/services/software-modules-service.types';
import FormControl from '@/app/components/form-control';
import Input from '@/app/components/input';
import TextArea from '@/app/components/text-area';
import { ActionButtons } from '@/app/components/action-buttons';
import Checkbox from '@/app/components/checkbox';

interface SoftwareModuleFormProps {
    onSubmit: (data: CreateSoftwareModuleInput) => void;
    onCancel: () => void;
    defaultValues?: Partial<CreateSoftwareModuleInput>;
}

export default function SoftwareModuleFormContainer({ onSubmit, onCancel, defaultValues }: SoftwareModuleFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateSoftwareModuleInput>({
        defaultValues: {
            name: '',
            version: '',
            type: '',
            description: '',
            vendor: '',
            encrypted: false,
            ...defaultValues,
        },
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id='name' label='Name' required errorMessage={errors.name?.message}>
                <Input id='name' type='text' placeholder='Enter the name of the module' {...register('name', { required: 'This field is required' })} />
            </FormControl>
            <FormControl id='version' label='Version' required errorMessage={errors.version?.message}>
                <Input id='version' type='text' placeholder='Enter the version' {...register('version', { required: 'This field is required' })} />
            </FormControl>
            <FormControl id='type' label='Type' required errorMessage={errors.type?.message}>
                <Input id='type' type='text' placeholder='Enter the type' {...register('type', { required: 'This field is required' })} />
            </FormControl>
            <FormControl id='description' label='Description'>
                <TextArea id='description' placeholder='Enter the description' {...register('description')} />
            </FormControl>
            <FormControl id='vendor' label='Vendor'>
                <Input id='vendor' type='text' placeholder='Enter the vendor' {...register('vendor')} />
            </FormControl>
            <FormControl id='encrypted' label='Encrypted'>
                <Checkbox id='encrypted' description='Encrypted' {...register('encrypted')} />
            </FormControl>
            <ActionButtons>
                <ActionButtons.Primary type='submit'>{isSubmitting ? 'Creating...' : 'Create'}</ActionButtons.Primary>
                <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
            </ActionButtons>
        </form>
    );
}
