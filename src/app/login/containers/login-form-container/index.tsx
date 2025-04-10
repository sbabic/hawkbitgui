'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/utils/routes';
import LoginForm from '@/app/login/components/login-form';

export type LoginFormContainerProps = {
    className?: string;
};

export default function LoginFormContainer({ className }: LoginFormContainerProps) {
    const router = useRouter();

    const onSubmit = async (data: { username: string; password: string }) => {
        try {
            const result = await signIn('credentials', {
                username: data.username,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                console.log('Login error:', result.error);
                console.log(result);
                return;
            }

            router.push(AppRoutes.deployment);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return <LoginForm onSubmit={onSubmit} className={className}></LoginForm>;
}
