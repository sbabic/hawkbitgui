'use client';
import { TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

export default function TextArea({ error, className, ...inputProps }: InputProps) {
    return (
        <div className={`${styles.container} ${className}`}>
            <textarea className={styles.textArea} {...inputProps} />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
