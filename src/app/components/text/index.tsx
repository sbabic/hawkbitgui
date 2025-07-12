import React from 'react';
import styles from './styles.module.scss';

type TextVariant =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'paragraph'
  | 'paragraph-bold'
  | 'paragraph-sm'
  | 'btn-text-lg'
  | 'btn-text-sm'
  | 'caption';
type TextColor = 'text-primary' | 'text-secondary' | 'text-disabled' | 'text-inverse' | 'text-accent' | 'text-muted';

interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const getHtmlElement = (variant: TextVariant): keyof React.JSX.IntrinsicElements => {
  switch (variant) {
    case 'heading-1':
      return 'h1';
    case 'heading-2':
      return 'h2';
    case 'heading-3':
      return 'h3';
    case 'heading-4':
      return 'h4';
    case 'paragraph':
      return 'p';
    case 'paragraph-bold':
      return 'p';
    case 'paragraph-sm':
      return 'p';
    case 'btn-text-lg':
      return 'p';
    case 'caption':
      return 'span';
    default:
      return 'p';
  }
};

export default function Text({ variant = 'paragraph', color, children, className = '', style }: TextProps) {
  const ElementType = getHtmlElement(variant);

  const classNames = [styles.text, styles[variant], color ? styles[color] : '', className].filter(Boolean).join(' ');

  return React.createElement(ElementType, { className: classNames, style }, children);
}
