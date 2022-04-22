import type { NextApiRequestExtended } from '../../../utils/types';
import jwt from 'cloudflare-worker-jwt';
import type { JwtPayload } from 'jsonwebtoken';
import validator from 'validator';

export function middleware(req: NextApiRequestExtended) {
  try {
    if (req.headers) {
      const authHeader: string = req.headers.get('authorization') || '';
      const token: string = authHeader.split(' ')[1];
      const decodedToken: JwtPayload | null = jwt.decode(token);
      const email: string = decodedToken?.email || '';
      const response = new Response();
      if (validator.isEmail(email)) {
        response.headers.set('email', email);
        return response;
      } else {
        return new Response(JSON.stringify({ message: 'unauthorized' }), {
          status: 401,
        });
      }
    }
  } catch (err) {
    return new Response(JSON.stringify({ message: 'an error ocurred during authentication' }));
  }
}
