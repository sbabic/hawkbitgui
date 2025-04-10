'use client';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import Button from '@/app/components/button';
import Input from '../input';
import Select from '@/app/components/select';
import TextArea from '@/app/components/text-area';

interface FormData {
    controllerId: string;
    name: string;
    type: string;
    description: string;
}

export default function CreateTargetForm({ onSubmit, onCancel }: { onSubmit: (data: FormData) => void; onCancel?: () => void }) {
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
                    <Select {...register('type', { required: true })} className={styles.select} error={errors.type && 'This field is required'}>
                        <option value=''>Choose a type</option>
                        <option value='type1'>Type 1</option>
                        <option value='type2'>Type 2</option>
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
