import type { Metadata } from 'next';
import './globals.scss';
import { getServerSession } from 'next-auth';
import Providers from './providers';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata: Metadata = {
    title: 'Hawkbit',
    description: 'Hawkbit',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    return (
        <html lang='en'>
            <body>
                <Providers session={session}>{children}</Providers>
            </body>
        </html>
    );
}
