'use client';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import Button from '@/app/components/button';
import Input from '../input';
import Select from '@/app/components/select';
import TextArea from '@/app/components/text-area';
import { TargetType } from '@/entities';

interface FormData {
    controllerId: string;
    name: string;
    targetTypeId: number;
    description: string;
}

export interface CreateTargetFormProps {
    onSubmit: (data: FormData) => void;
    onCancel?: () => void;
    targetTypes?: TargetType[];
}

export default function CreateTargetForm({ onSubmit, onCancel, targetTypes }: CreateTargetFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    return (
        <div className={styles.container}>
            <h3>Create New Target</h3>
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
                        <option value=''>Choose a type</option>
                        {targetTypes?.map((type) => (
                            <option key={type.id} value={type.id}>
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
                    <Button>Save</Button>
                </div>
            </form>
        </div>
    );
}
