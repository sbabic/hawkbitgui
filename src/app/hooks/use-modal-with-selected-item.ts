import { useState } from 'react';

export function useModalWithSelectedItem<T = unknown>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const open = (item: T) => {
    setData(item);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
  };

  return {
    isOpen,
    data,
    open,
    close,
  };
}
