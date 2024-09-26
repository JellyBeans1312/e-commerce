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

const formSchema = z.object({
    name: z.string().min(1)
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    onSubmit: (values: FormValues) => void,
    onCancel: () => void;
    disabled: boolean,
    defaultValues?: FormValues
};

export const StoreForm = ({
    onSubmit,
    disabled, 
    defaultValues,
    onCancel
}: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values)
    }

    const handleCancel = () => {
        onCancel();
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
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ))}
                />
                <div className='pt-6 space-x-2 flex items-center justify-end w-full`'>
                    <Button
                        variant={"outline"}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
    )
}