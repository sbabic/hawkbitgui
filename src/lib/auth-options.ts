import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { environment } from '@/config/env';
import { cookies } from 'next/headers';

/**
 * Generic OIDC provider configuration.
 * Works with any OpenID Connect compliant provider (Keycloak, Auth0, Okta, etc.)
 * by reading the provider metadata from the issuer's well-known endpoint.
 */
function createOidcProvider() {
    return {
        id: 'oidc',
        name: process.env.OIDC_PROVIDER_NAME ?? 'OIDC',
        type: 'oauth' as const,
        wellKnown: `${environment.oidcIssuerUrl}/.well-known/openid-configuration`,
        authorization: { params: { scope: 'openid email profile' } },
        idToken: true,
        checks: ['pkce', 'state'] as ['pkce', 'state'],
        profile(profile: Record<string, unknown>) {
            return {
                id: profile.sub as string,
                name: (profile.name ?? profile.preferred_username ?? profile.sub) as string,
                email: (profile.email ?? '') as string,
            };
        },
        clientId: environment.oidcClientId!,
        clientSecret: environment.oidcClientSecret!,
    };
}

const oidcEnabled =
    !!environment.oidcIssuerUrl &&
    !!environment.oidcClientId &&
    !!environment.oidcClientSecret;

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(oidcEnabled ? [createOidcProvider() as any] : []),
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
