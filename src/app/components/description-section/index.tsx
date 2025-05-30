'use client';

import styles from './styles.module.scss';

export default function DescriptionSection({ description }: { description: string }) {
  return (
    <div className={styles.container}>
      <h2>Description</h2>
      <p>{description}</p>
    </div>
  );
}
