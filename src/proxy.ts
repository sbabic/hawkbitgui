import { chain } from '@/middlewares/chain-middlewares';
import { withSessionRedirectsMiddleware } from '@/middlewares/with-session-redirects-middleware';

export default chain([withSessionRedirectsMiddleware]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)'],
};
