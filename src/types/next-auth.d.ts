import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
    interface User {
        tenant: string;
        username: string;
    }

    interface Session {
        user: {
            tenant: string;
            username: string;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        tenant: string;
        username: string;
    }
} 