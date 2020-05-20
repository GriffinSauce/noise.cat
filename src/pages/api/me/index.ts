import { NextApiHandler } from 'next';
import auth0 from 'utils/auth0';

const handler: NextApiHandler = async function me(req, res) {
  try {
    await auth0.handleProfile(req, res, {});
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default handler;
