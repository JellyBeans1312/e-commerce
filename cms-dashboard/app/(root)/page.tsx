"use client"

import { useEffect } from 'react';

import { useStoreModal } from '@/features/store/hooks/use-store-modal';

export default function Home() {
  const { onOpen, isOpen } = useStoreModal();

  useEffect(() => {
    if(!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen])
  return (
    <> 

    </>
  );
}
