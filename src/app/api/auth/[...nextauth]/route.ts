import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { AuthOptions } from 'next-auth';
import { environment } from '@/config/env';

/**
 * We are using the CredentialsProvider to authenticate the user against the Hawkbit Management API.
 * There is not an authentication endpoint exclusively for this purpose, so we are using the userinfo endpoint.
 */
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.get(
                        `${environment.hawkbitManagementApiUrl}/rest/v1/userinfo`,
                        {
                            headers: {
                                Authorization: `Basic ${Buffer.from(`${credentials?.username}:${credentials?.password}`).toString('base64')}`,
                                Accept: 'application/json, application/hal+json',
                                'X-Requested-With': 'XMLHttpRequest',
                            },
                        }
                    );

                    if (!response.data) {
                        return null;
                    }

                    const auth = `${credentials?.username}:${credentials?.password}`;
                    return {
                        id: response.data.tenant + response.data.username,
                        tenant: response.data.tenant,
                        username: response.data.username,
                        auth: Buffer.from(auth).toString('base64'),
                    };
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.tenant = user.tenant;
                token.username = user.username;
                token.auth = user.auth;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.tenant = token.tenant;
                session.user.username = token.username;
                session.user.auth = token.auth;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
