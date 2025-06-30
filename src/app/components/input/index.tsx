'use client';
import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type InputSize = 'sm' | 'lg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  inputSize?: InputSize;
}

export default function Input({ error, inputSize = 'lg', className = '', ...inputProps }: InputProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <input className={`${styles.input} ${styles[inputSize]}`} {...inputProps} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
