'use client';

import Text from '../text';
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
      <Text variant='heading-2'>{title}</Text>
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
