import nextConnect from 'next-connect';
import middleware, { RequestWithDb } from '../../../../middleware/db';
import auth0 from '../../../../utils/auth0';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: RequestWithDb, res: NextConnectResponse) => {
  const { user } = await auth0.getSessionFromReq(req);
  const slug = req.query.band;
  const band = await req.db.collection('band').findOne({
    slug,
  });
  if (!band)
    return res.status(404).json({
      error: `No band by slug "${slug}"`,
    });
  if (!band.members.includes(user.sub))
    return res.status(403).json({
      error: `You're not a member of this band`,
    });
  return res.json({
    band,
  });
});

export default auth0.requireAuthentication(handler);
