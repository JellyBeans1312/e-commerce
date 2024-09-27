import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { 
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useStoreModal } from '../hooks/use-store-modal';

const formSchema = z.object({
    name: z.string().min(1)
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    onSubmit: (values: FormValues) => void,
    disabled?: boolean,
    defaultValues?: FormValues
};

export const StoreForm = ({
    onSubmit,
    disabled, 
    defaultValues,
}: Props) => {
    const { onClose } = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={(({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder='My fancy e-commerce store'
                                    {...field}
                                    disabled={disabled}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ))}
                />
                <div className='pt-6 space-x-2 flex items-center justify-end w-full`'>
                    <Button
                        variant={"outline"}
                        onClick={onClose}
                        disabled={disabled}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={disabled}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
    )
}