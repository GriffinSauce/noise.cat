import { HandlerError } from '@auth0/nextjs-auth0';
import { NextApiHandler } from 'next';
import auth0 from 'utils/auth0';

const handler: NextApiHandler = async function me(req, res) {
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    let message = 'error';
    let status = 400;
    if (error instanceof HandlerError) {
      message = error.message || message;
      status = error.status || status;
    }

    console.error(message);
    return res.status(status).end(message);
  }
};

export default handler;
