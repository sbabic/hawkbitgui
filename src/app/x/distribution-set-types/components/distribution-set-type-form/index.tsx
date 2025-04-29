'use client';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import TextArea from '@/app/components/text-area';
import Input from '@/app/components/input';
import FormControl from '@/app/components/form-control';
import { useEffect } from 'react';
import { CreateDistributionSetTypeInput } from '@/services/distribution-set-types-service.types';
import { ActionButtons } from '@/app/components/action-buttons';

export interface DistributionSetTypeFormProps {
    defaultValues?: Partial<CreateDistributionSetTypeInput>;
    mode?: 'create' | 'edit';
    onSubmit: (data: CreateDistributionSetTypeInput) => void;
    onCancel: () => void;
}

export default function DistributionSetTypeForm({ onSubmit, onCancel, defaultValues }: DistributionSetTypeFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateDistributionSetTypeInput>({
        defaultValues: {
            mandatorymodules: [],
            optionalmodules: [],
            ...defaultValues,
        },
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
            <FormControl id='name' label='Name' required errorMessage={errors.name?.message}>
                <Input
                    id='name'
                    className={styles.input}
                    type='text'
                    placeholder='Enter the name of the entity'
                    {...register('name', { required: 'This field is required' })}
                />
            </FormControl>

            <FormControl id='description' label='Description'>
                <TextArea id='description' placeholder='Enter the description of the entity' {...register('description')} className={styles.textarea} />
            </FormControl>

            <FormControl id='colour' label='Colour'>
                <Input id='colour' className={styles.input} type='text' placeholder='Enter the colour of the entity' {...register('colour')} />
            </FormControl>

            <FormControl id='key' label='Key' required errorMessage={errors.key?.message}>
                <Input
                    id='key'
                    className={styles.input}
                    type='text'
                    placeholder='Enter the functional key'
                    {...register('key', { required: 'This field is required' })}
                />
            </FormControl>

            <ActionButtons>
                <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
                <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
            </ActionButtons>
        </form>
    );
}
