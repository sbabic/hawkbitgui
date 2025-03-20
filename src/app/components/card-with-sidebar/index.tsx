'use client';

import styles from './styles.module.scss';
import { useState } from 'react';

export default function CardWithSidebar({
    content,
}: {
    content: {
        title: string;
        component: React.ReactNode;
    }[];
}) {
    const [selectedTitle, setSelectedTitle] = useState(content[0]?.title || '');

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.menu}>
                    {content.map((item) => (
                        <div
                            key={item.title}
                            className={`${styles.menuItem} ${selectedTitle === item.title ? styles.active : ''}`}
                            onClick={() => setSelectedTitle(item.title)}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.content}>
                {
                    content.find((item) => item.title === selectedTitle)
                        ?.component
                }
            </div>
        </div>
    );
}
