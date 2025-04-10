'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export default function Providers({ children, session }: { children: ReactNode; session: Session | null }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>{children}</SessionProvider>
        </QueryClientProvider>
    );
}
