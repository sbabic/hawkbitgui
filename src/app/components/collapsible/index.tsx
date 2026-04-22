import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import styles from './styles.module.scss';

type CollapsibleContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

export function Collapsible({ children, defaultOpen = false }: { children: ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle }}>
      <div className={styles.collapsible}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

function Trigger({ children }: { children: ReactNode }) {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) throw new Error('Trigger must be used within Collapsible');

  return (
    <div onClick={ctx.toggle} className={styles.collapsible__toggle}>
      {children}
      <span className={`${styles.arrow} ${ctx.isOpen ? styles.open : ''}`}>&#9662;</span>
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) throw new Error('Content must be used within Collapsible');

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(ctx.isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [ctx.isOpen, children]);

  return (
    <div ref={contentRef} className={styles.collapsible__content} style={{ maxHeight: height }}>
      <div className={styles.collapsible__inner}>{children}</div>
    </div>
  );
}

Collapsible.Trigger = Trigger;
Collapsible.Content = Content;
