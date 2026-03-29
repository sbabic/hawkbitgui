import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { CustomMiddleware } from './chain-middlewares';
import { AppRoutes } from '@/utils/routes';

export function withSessionRedirectsMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();

    const pathname = request.nextUrl.pathname;
    const token = await getToken({ req: request });

    const isApiRoute = pathname.startsWith('/api');
    if (isApiRoute) {
      return middleware(request, event, response);
    }

    const isAuthenticationRoute = pathname.startsWith(AppRoutes.login);

    if (!token && !isAuthenticationRoute) {
      const loginUrl = new URL(AppRoutes.login, request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (token && isAuthenticationRoute) {
      const dashboardUrl = new URL(AppRoutes.dashboard, request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    return middleware(request, event, response);
  };
}
