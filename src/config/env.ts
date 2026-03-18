export const environment = {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    hawkbitApiUrl: process.env.NEXT_PUBLIC_HAWKBIT_API_URL,

    // Optional OIDC provider (e.g. Keycloak, Auth0, Okta — any standard OIDC issuer).
    // When set, a "Sign in via OIDC" button appears on the login page.
    oidcIssuerUrl: process.env.OIDC_ISSUER_URL,
    oidcClientId: process.env.OIDC_CLIENT_ID,
    oidcClientSecret: process.env.OIDC_CLIENT_SECRET,

    // HawkBit service account used when authenticating via OIDC.
    // OIDC users cannot supply per-user HawkBit credentials, so the proxy
    // falls back to these credentials for all HawkBit API calls.
    // Required when OIDC_ISSUER_URL is set.
    hawkbitServiceUsername: process.env.HAWKBIT_SERVICE_USERNAME,
    hawkbitServicePassword: process.env.HAWKBIT_SERVICE_PASSWORD,
};
