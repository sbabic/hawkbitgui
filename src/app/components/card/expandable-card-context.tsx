'use client';

import React, { createContext, useContext, useRef, ReactNode } from 'react';

interface ExpandableCardContextType {
  parentElementRef: React.RefObject<HTMLDivElement | null>;
}

const ExpandableCardContext = createContext<ExpandableCardContextType | null>(null);

interface ExpandableCardProviderProps {
  children: ReactNode;
}

export function ExpandableCardProvider({ children }: ExpandableCardProviderProps) {
  const parentElementRef = useRef<HTMLDivElement>(null);

  return (
    <ExpandableCardContext.Provider value={{ parentElementRef }}>
      <div ref={parentElementRef} style={{ height: '100%', width: '100%', position: 'relative' }}>
        {children}
      </div>
    </ExpandableCardContext.Provider>
  );
}

export function useExpandableCardContext() {
  const context = useContext(ExpandableCardContext);
  if (!context) {
    throw new Error('useExpandableCardContext must be used within a CardProvider');
  }
  return context;
}
