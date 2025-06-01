'use client';
import { SelectHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export default function Select({ error, className, ...selectProps }: SelectProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <select className={styles.select} {...selectProps}>
        {selectProps.children}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
