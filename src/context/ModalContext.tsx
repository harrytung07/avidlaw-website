"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  // Tracks if any modal is currently open
  isAnyModalOpen: boolean;
  // Allows components to register when they open/close a modal
  setModalOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState<boolean>(false);

  const setModalOpen = (isOpen: boolean) => {
    setIsAnyModalOpen(isOpen);
  };

  return (
    <ModalContext.Provider value={{ isAnyModalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
} 