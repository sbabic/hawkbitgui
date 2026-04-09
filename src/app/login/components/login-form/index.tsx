'use client';

import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import FormControl from '@/app/components/form-control';
import Input from '@/app/components/input';
import { LoginFormData, LoginFormSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/app/components/button';
import Form from '@/app/components/form';
import Text from '@/app/components/text';

export interface LoginFormProps {
  className?: string;
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export default function LoginForm({ className, onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.card}>
        <Text variant='heading-1'>Login to Account</Text>
        <Text variant='heading-4' color='text-secondary'>
          Please enter your username and password to continue
        </Text>
        <Form method='post' onSubmit={handleSubmit(onSubmit)} style={{ gap: '40px' }}>
          <FormControl id='username' label='Username' errorMessage={errors.username?.message}>
            <Input {...register('username')} />
          </FormControl>

          <FormControl id='password' label='Password' errorMessage={errors.password?.message}>
            <Input type='password' {...register('password')} />
          </FormControl>
          <Button type='submit' isLoading={isSubmitting}>
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}
