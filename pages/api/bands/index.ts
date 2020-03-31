import nextConnect from 'next-connect';
import middleware, { RequestWithDb } from '../../../middleware/db';
import auth0 from '../../../utils/auth0';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: RequestWithDb, res: NextConnectResponse) => {
  // @ts-ignore
  const { user } = await auth0.getSession(req);
  const bands = await req.db
    .collection('band')
    .find({
      members: user.sub,
    })
    .toArray();
  return res.json({
    bands,
  });
});

export default auth0.requireAuthentication(handler);
