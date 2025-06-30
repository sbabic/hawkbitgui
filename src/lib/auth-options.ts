import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { environment } from '@/config/env';
import { cookies } from 'next/headers';

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
          const response = await axios.get(`${environment.hawkbitApiUrl}/rest/v1/userinfo`, {
            headers: {
              Authorization: `Basic ${Buffer.from(`${credentials?.username}:${credentials?.password}`).toString('base64')}`,
              Accept: 'application/json, application/hal+json',
              'X-Requested-With': 'XMLHttpRequest',
            },
          });

          if (!response.data) {
            return null;
          }

          const auth = `${credentials?.username}:${credentials?.password}`;
          const cookieStore = await cookies();
          cookieStore.set('auth', Buffer.from(auth).toString('base64'), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600, // 1 hour
            sameSite: 'strict',
            path: '/',
          });

          return {
            id: response.data.tenant + response.data.username,
            tenant: response.data.tenant,
            username: response.data.username,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 3600, // 1 hour
    updateAge: 300, // 5 minutes
  },
  jwt: {
    maxAge: 3600, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tenant = user.tenant;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.tenant = token.tenant;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
