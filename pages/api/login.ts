import { NextApiHandler } from 'next';
import auth0 from '../../utils/auth0';

const handler: NextApiHandler = async function me(req, res) {
  const redirectTo = req.query.redirectTo ? `${req.query.redirectTo}` : '/';
  try {
    await auth0.handleLogin(req, res, { redirectTo });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};

export default handler;
