import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Calendar } from '~/commons/components/Calendar';
import { Input } from '~/commons/components/Input';

export const CreateMeet = () => {
    const createMeetSchema = z.object({ name: z.string(), date: z.array(z.date()) });

    const form = useForm({ defaultValues: { name: '', date: [new Date()] }, resolver: zodResolver(createMeetSchema) });

    const handleSuccesSubmit = async (data: z.infer<typeof createMeetSchema>) => {
        console.log('🚀 ~ handleSuccesSubmit ~ data:', data);
        const x = await fetch('http://localhost:3000/ping');
        console.log('🚀 ~ handleSuccesSubmit ~ x:', x);
    };

    console.log("🚀 ~ CreateMeet ~ ...form.register('date')}:", form.register('date'));
    return (
        <form
            className="max-w-64 flex flex-col gap-8"
            onSubmit={form.handleSubmit(handleSuccesSubmit)}
        >
            <Input
                autoFocus
                {...form.register('name')}
                label="Nazwa spotkania"
            />
            <Calendar
                label="Data spotkania"
                control={form.control}
                name="date"
            />
            <button type="submit">wyślij</button>
        </form>
    );
};
