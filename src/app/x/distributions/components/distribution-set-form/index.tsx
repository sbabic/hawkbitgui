'use client';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import TextArea from '@/app/components/text-area';
import Input from '@/app/components/input';
import Checkbox from '@/app/components/checkbox';
import FormControl from '@/app/components/form-control';
import { useEffect } from 'react';
import { CreateDistributionSetInput } from '@/services/distribution-sets-services.types';
import { ActionButtons } from '@/app/components/action-buttons';
import { DistributionSetType } from '@/entities/distribution-set-type';
import Select from '@/app/components/select';

export interface DistributionSetFormProps {
    distributionSetTypes: DistributionSetType[];
    defaultValues?: Partial<CreateDistributionSetInput>;
    mode?: 'create' | 'edit';
    onSubmit: (data: CreateDistributionSetInput) => void;
    onCancel: () => void;
}

export default function DistributionSetForm({ distributionSetTypes, onSubmit, onCancel, defaultValues }: DistributionSetFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateDistributionSetInput>({
        defaultValues: {
            locked: false,
            requiredMigrationStep: false,
            modules: [],
            ...defaultValues,
        },
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const typeOptions = distributionSetTypes.map((type) => ({ id: type.key, label: type.name }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
            <FormControl id='name' label='Name' required errorMessage={errors.name?.message}>
                <Input
                    id='name'
                    className={styles.input}
                    type='text'
                    placeholder='Enter the distribution set name'
                    {...register('name', { required: 'This field is required' })}
                />
            </FormControl>

            <FormControl id='description' label='Description'>
                <TextArea id='description' placeholder='Enter the description of the entity' {...register('description')} className={styles.textarea} />
            </FormControl>

            <FormControl id='version' label='Version'>
                <Input id='version' className={styles.input} type='text' placeholder='Enter package version' {...register('version')} />
            </FormControl>

            <FormControl id='type' label='Type'>
                <Select id='type' className={styles.input} {...register('type')}>
                    {typeOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </FormControl>

            <FormControl id='locked'>
                <Checkbox id='locked' description='Locked' {...register('locked')} />
            </FormControl>

            <FormControl id='requiredMigrationStep'>
                <Checkbox id='requiredMigrationStep' description='Required Migration Step' {...register('requiredMigrationStep')} />
            </FormControl>

            <ActionButtons>
                <ActionButtons.Primary type='submit'>Save</ActionButtons.Primary>
                <ActionButtons.Secondary onClick={onCancel}>Cancel</ActionButtons.Secondary>
            </ActionButtons>
        </form>
    );
}
