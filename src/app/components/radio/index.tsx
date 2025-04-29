import React from 'react';
import styles from './styles.module.scss';

type RadioProps = {
    id: string;
    label: string;
    checked: boolean;
    onChange: (value: string) => void;
};

export default function Radio({ id, label, checked, onChange }: RadioProps) {
    return (
        <div className={`${styles.radioContainer} ${checked ? styles.checked : ''}`}>
            <input type='radio' id={id} checked={checked} onChange={() => onChange(id)} className={styles.radioInput} />
            <label htmlFor={id} className={styles.radioLabel}>
                <span>{label}</span>
            </label>
        </div>
    );
}
