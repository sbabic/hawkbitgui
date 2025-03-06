'use client';

import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

type FormValues = {
    username: string;
    password: string;
};

export interface LoginFormProps {
    className?: string;
}

export default function LoginForm(props: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log('Login Data:', data);
        // Handle authentication logic here
    };

    return (
        <div className={`${styles.container} ${props.className}`}>
            <div className={styles.card}>
                <h2 className={styles.title}>Login to Account</h2>
                <p className={styles.subtitle}>
                    Please enter your username and password to continue
                </p>
                <div style={{ height: 40 }}></div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles['input-group']}>
                        <label>Username</label>
                        <input
                            type='text'
                            {...register('username', {
                                required: 'Username is required',
                            })}
                        />
                        {errors.username && (
                            <p className={styles.error}>
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                    <div style={{ height: 40 }}></div>

                    <div className={styles['input-group']}>
                        <label>Password</label>
                        <input
                            type='password'
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />
                        {errors.password && (
                            <p className={styles.error}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div style={{ height: 40 }}></div>
                    <button type='submit' className={styles.button}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
