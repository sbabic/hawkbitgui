import React from 'react';
import styles from './styles.module.scss';

type TextVariant = 'heading-1' | 'heading-2' | 'body-1' | 'body-2' | 'caption';
type TextColor = 'text-primary' | 'text-secondary' | 'title-primary' | 'title-secondary';

interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  children: React.ReactNode;
  className?: string;
}

const getHtmlElement = (variant: TextVariant): keyof React.JSX.IntrinsicElements => {
  switch (variant) {
    case 'heading-1':
      return 'h1';
    case 'heading-2':
      return 'h2';
    case 'body-1':
    case 'body-2':
    case 'caption':
    default:
      return 'p';
  }
};

export default function Text({ variant = 'body-1', color, children, className = '' }: TextProps) {
  const ElementType = getHtmlElement(variant);

  const classNames = [styles.text, styles[variant], color ? styles[color] : '', className].filter(Boolean).join(' ');

  return React.createElement(ElementType, { className: classNames }, children);
}
