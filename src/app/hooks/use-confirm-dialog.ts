import { useState } from 'react';

export function useConfirmDialog<T = unknown>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const open = (item: T, confirm: () => void) => {
    setData(item);
    setOnConfirm(() => confirm);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
    setOnConfirm(null);
  };

  const confirm = () => {
    if (onConfirm) onConfirm();
    close();
  };

  return {
    isOpen,
    data,
    open,
    close,
    confirm,
  };
}
