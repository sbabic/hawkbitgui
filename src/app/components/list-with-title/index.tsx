'use client';

import styles from './styles.module.scss';

export default function ListWithTitle({
    title,
    items,
}: {
    title: string;
    items: {
        title: string;
        value?: string | number | boolean | null;
    }[];
}) {
    return (
        <div className={styles.container}>
            <h2>{title}</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <strong>{item.title}:</strong> {item.value ?? 'N/A'}
                    </li>
                ))}
            </ul>
        </div>
    );
}
