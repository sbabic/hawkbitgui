import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth-options';

/**
 * We are using the CredentialsProvider to authenticate the user against the Hawkbit Management API.
 * There is not an authentication endpoint exclusively for this purpose, so we are using the userinfo endpoint.
 */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
