import styles from './styles.module.scss';
import React from 'react';

type ChipProps = {
  value?: string;
  colorClassName?: string;
};

export function Chip({ value, colorClassName }: ChipProps) {
  return (
    <div className={styles.chip}>
      <span className={`${styles.colorIndicator} ${colorClassName}`} />
      {value}
    </div>
  );
}
