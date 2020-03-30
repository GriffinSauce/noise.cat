import nextConnect from 'next-connect';
import middleware, { RequestWithDb } from '../../../middleware/db';
import auth0 from '../../../utils/auth0';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: RequestWithDb, res: NextConnectResponse) => {
  const { user } = await auth0.getSession(req);
  const bands = await req.db
    .collection('band')
    .find({
      members: user.sub,
    })
    .toArray();
  res.json({ bands });
});

const appliedHandler: NextConnectHandler = (res, req) =>
  handler.apply(req, res); // Workaround for false positive "API resolved without sending a response"
export default auth0.requireAuthentication(appliedHandler);
