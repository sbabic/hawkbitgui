'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppRoutes } from '@/utils/routes';
import LoginForm from '@/app/login/components/login-form';
import toast from 'react-hot-toast';
import { handleErrorWithToast } from '@/utils/handle-error-with-toast';
import { useEffect } from 'react';
import Button from '@/app/components/button';
import Text from '@/app/components/text';

export type LoginFormContainerProps = {
  className?: string;
  oidcEnabled?: boolean;
};

export default function LoginFormContainer({ className, oidcEnabled = false }: LoginFormContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      switch (error) {
        case 'unauthorized':
          toast.error('Your session has expired. Please log in again.');
          break;
        default:
          toast.error('An error occurred. Please try again.');
      }

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [searchParams]);

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

  const onOidcSignIn = () => {
    signIn('oidc', { callbackUrl: AppRoutes.deployment });
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <LoginForm onSubmit={onSubmit} />
      {oidcEnabled && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <hr style={{ flex: 1 }} />
            <Text variant='caption' color='text-secondary'>or</Text>
            <hr style={{ flex: 1 }} />
          </div>
          <Button type='button' onClick={onOidcSignIn} variant='outline'>
            Sign in via OIDC
          </Button>
        </>
      )}
    </div>
  );
}
