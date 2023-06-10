import { useState, ReactNode, useCallback } from 'react';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (isOpen) {
    return (
      <div className='fixed left-0 top-0 h-full w-full'>
        <div
          className='z-4 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm backdrop-filter'
          onClick={onClose}
          onKeyDown={onClose}
          role='presentation'
        />
        <div className='z-5 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
          {children}
        </div>
      </div>
    );
  }

  return null;
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return { isOpen, openModal, closeModal };
};
