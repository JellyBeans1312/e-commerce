import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from "@/lib/hono";
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.stores.$post>
type RequestType = InferRequestType<typeof client.api.stores.$post>["json"]

export const useCreateStore = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error, 
    RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.stores.$post({ json });
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Store Created")
            queryClient.invalidateQueries({ queryKey: ['stores'] })
        },
        onError: () => {
            toast.error("Unable to create your store")
        }
    });
    return mutation;
}