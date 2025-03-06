'use client';

import styles from './styles.module.scss';
import { useState } from 'react';

export default function Card({ children }: { children?: React.ReactNode }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={styles.container}>
            <button>expand</button>
            {children}
        </div>
    );
}
