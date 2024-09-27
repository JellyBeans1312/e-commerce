"use client";

import { Modal } from "@/components/modal";
import { Form } from "@/components/ui/form";

import { StoreForm } from "@/features/store/components/store-form";
import { useStoreModal } from "@/features/store/hooks/use-store-modal";
import { useCreateStore } from "@/features/store/api/use-create-store";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(1),
});

type FormValues = z.input<typeof formSchema>

export const StoreModal = () => {
    const {isOpen, onClose} = useStoreModal();

    const createStore = useCreateStore();


    const onSubmit = async (values: FormValues) => {
        createStore.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        })
    }

    const defaultValues = {
        name: ''
    }
    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <StoreForm 
                        onSubmit={onSubmit}
                        disabled={createStore.isPending}
                        defaultValues={defaultValues}
                    />
                </div>
            </div>
        </Modal>
    )
}