"use client";

import { useMountedState } from "react-use";

import { StoreModal } from "@/features/store/components/store-modal";


export const ModalProvider = () => {
    const isMounted = useMountedState();

    if(!isMounted) return null;
    
    return (
        <>
            <StoreModal />
        </>
    )
}