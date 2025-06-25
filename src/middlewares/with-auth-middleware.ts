import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { AppRoutes } from '@/utils/routes';
import { CustomMiddleware } from './chain-middlewares';

const protectedPaths = [AppRoutes.dashboard];

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    const token = await getToken({ req: request });

    // @ts-expect-error - Add token to request
    request.nextauth = request.nextauth || {};
    // @ts-expect-error - Add token to request
    request.nextauth.token = token;
    const pathname = request.nextUrl.pathname;

    if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
      const signInUrl = new URL(AppRoutes.login, request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    return middleware(request, event, response);
  };
}
