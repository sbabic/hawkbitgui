'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/utils/routes';
import LoginForm from '@/app/login/components/login-form';
import toast from 'react-hot-toast';
import { handleErrorWithToast } from '@/utils/handle-error-with-toast';

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

      if (result?.error && result.error === 'CredentialsSignin') {
        toast.error('Invalid username or password');
        return;
      }

      router.push(AppRoutes.deployment);
      router.refresh();
    } catch (error) {
      handleErrorWithToast(error);
    }
  };

  return <LoginForm onSubmit={onSubmit} className={className}></LoginForm>;
}
