import { ReactNode, useState } from 'react';
import styles from './styles.module.scss';

export default function TargetFilters() {
    const content: {
        title: string;
        component: ReactNode;
    }[] = [
        {
            title: 'By Status',
            component: <div></div>,
        },
        {
            title: 'Simple Filter',
            component: <div></div>,
        },
        {
            title: 'Type Filter',
            component: <div></div>,
        },
        {
            title: 'Custom Filter',
            component: <div></div>,
        },
    ];

    const [selectedTitle, setSelectedTitle] = useState(content[0]?.title || '');

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                {content.map((item) => (
                    <button
                        key={item.title}
                        className={`${styles.filter} ${selectedTitle === item.title ? styles.active : ''}`}
                        onClick={() => setSelectedTitle(item.title)}
                    >
                        {item.title}
                    </button>
                ))}
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
