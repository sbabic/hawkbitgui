import styles from './styles.module.scss';
import { Children, isValidElement } from 'react';

interface CardsContainerGridProps {
  children: React.ReactNode;
  distributionInPercentages: number[];
}

function convertPercentagesToFr(percentages: number[]): string {
  const total = percentages.reduce((sum, p) => sum + p, 0);
  return percentages
    .map((p) => (p / total).toFixed(2))
    .map((ratio) => `${parseFloat(ratio)}fr`)
    .join(' ');
}

export default function CardsContainerGrid({ distributionInPercentages, children }: CardsContainerGridProps) {
  const directChildrenCount = Children.toArray(children).filter((child) => isValidElement(child)).length;
  if (directChildrenCount !== distributionInPercentages.length) {
    throw new Error('Number of direct children must be equal to the distributionInPercentages array length');
  }

  const gridTemplateColumns = convertPercentagesToFr(distributionInPercentages);

  return (
    <div className={styles.container} style={{ gridTemplateColumns }}>
      {children}
    </div>
  );
}
