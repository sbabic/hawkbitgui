import { chain } from '@/middlewares/chain-middlewares';
import { withAuthMiddleware } from '@/middlewares/with-auth-middleware';
import { withSessionRedirectsMiddleware } from '@/middlewares/with-session-redirects-middleware';

export default chain([withAuthMiddleware, withSessionRedirectsMiddleware]);

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|images|fonts).*)'],
};
