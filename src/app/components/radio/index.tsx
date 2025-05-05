import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

type RadioProps = {
    id: string;
    label: string;
    checked: boolean;
    onChange: (value: string) => void;
    icon?: ReactNode;
};

export default function Radio({ id, label, checked, onChange, icon }: RadioProps) {
    return (
        <div className={`${styles.radioContainer} ${checked ? styles.checked : ''}`}>
            <input type='radio' id={id} checked={checked} onChange={() => onChange(id)} className={styles.radioInput} />
            <label htmlFor={id} className={styles.radioLabel}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <span className={styles.labelText}>{label}</span>
            </label>
        </div>
    );
}
