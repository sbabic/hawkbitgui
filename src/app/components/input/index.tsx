'use client';
import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export default function Input({ error, className, ...inputProps }: InputProps) {
    return (
        <div className={`${styles.container} ${className}`}>
            <input className={styles.input} {...inputProps} />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
