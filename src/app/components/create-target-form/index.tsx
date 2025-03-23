'use client';

import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';

interface FormData {
    controllerId: string;
    name: string;
    type: string;
    description: string;
}

export default function CreateTargetForm({
    onSubmit,
}: {
    onSubmit: (data: FormData) => void;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <label className={styles.label}>Controller ID</label>
            <input
                type='text'
                placeholder='Enter the controller ID'
                {...register('controllerId', { required: true })}
                className={styles.input}
            />
            {errors.controllerId && (
                <p className='error'>This field is required</p>
            )}

            <label className={styles.label}>Name</label>
            <input
                type='text'
                placeholder='Enter the target name'
                {...register('name', { required: true })}
                className={styles.input}
            />
            {errors.name && <p className='error'>This field is required</p>}

            <label className={styles.label}>Type</label>
            <select
                {...register('type', { required: true })}
                className={styles.select}
            >
                <option value=''>Choose a type</option>
                <option value='type1'>Type 1</option>
                <option value='type2'>Type 2</option>
            </select>
            {errors.type && <p className='error'>This field is required</p>}

            <label className={styles.label}>Description</label>
            <textarea
                placeholder='Add additional details'
                {...register('description')}
                className={styles.textarea}
            />

            <div className={styles.buttonContainer}>
                <button
                    type='button'
                    className={`${styles.button} ${styles.cancelButton}`}
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className={`${styles.button} ${styles.saveButton}`}
                >
                    Save
                </button>
            </div>
        </form>
    );
}
