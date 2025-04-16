'use client';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import Button from '@/app/components/button';
import Input from '../input';
import Select from '@/app/components/select';
import TextArea from '@/app/components/text-area';
import { TargetType } from '@/entities';
import { useEffect } from 'react';

export interface FormData {
    controllerId: string;
    name: string;
    targetTypeId: number;
    description: string;
}

export interface TargetFormProps {
    onSubmit: (data: FormData) => void;
    onCancel?: () => void;
    targetTypes?: TargetType[];
    defaultValues?: Partial<FormData>;
    mode?: 'create' | 'edit';
}

export default function TargetForm({ onSubmit, onCancel, targetTypes, defaultValues, mode = 'create' }: TargetFormProps) {
    console.log(defaultValues);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        defaultValues,
    });

    const isEditing = mode === 'edit';

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <div className={styles.container}>
            <h3>{isEditing ? 'Edit Target' : 'Create New Target'}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Controller ID</label>
                    <Input
                        className={styles.input}
                        type='text'
                        placeholder='Enter the controller ID'
                        {...register('controllerId', { required: true })}
                        error={errors.controllerId && 'This field is required'}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label className={styles.label}>Name</label>
                    <Input
                        className={styles.input}
                        type='text'
                        placeholder='Enter the target name'
                        {...register('name', { required: true })}
                        error={errors.name && 'This field is required'}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label className={styles.label}>Type</label>
                    <Select
                        {...register('targetTypeId', {
                            setValueAs: (value) => Number(value),
                        })}
                        className={styles.select}
                    >
                        <option value={undefined}>Choose a type</option>
                        {targetTypes?.map((type) => (
                            <option key={type.id} value={String(type.id)}>
                                {type.name}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className={styles.inputContainer}>
                    <label className={styles.label}>Description</label>
                    <TextArea placeholder='Add additional details' {...register('description')} className={styles.textarea} />
                </div>

                <div className={styles.buttonContainer}>
                    <Button color='outline' onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button>{isEditing ? 'Update' : 'Save'}</Button>
                </div>
            </form>
        </div>
    );
}
