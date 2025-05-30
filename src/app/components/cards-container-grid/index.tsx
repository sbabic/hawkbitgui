import styles from './styles.module.scss';
import { Children, isValidElement } from 'react';

interface CardsContainerGridProps {
  children: React.ReactNode;
  distributionInPercentages: number[];
}

export default function CardsContainerGrid({ distributionInPercentages, children }: CardsContainerGridProps) {
  const directChildrenCount = Children.toArray(children).filter((child) => isValidElement(child)).length;
  if (directChildrenCount !== distributionInPercentages.length) {
    throw new Error('Number of direct children must be equal to the distributionInPercentages array length');
  }

  const gridTemplateColumns = distributionInPercentages.map((percentage) => `${percentage}%`).join(' ');

  return (
    <div className={styles.container} style={{ gridTemplateColumns }}>
      {children}
    </div>
  );
}
