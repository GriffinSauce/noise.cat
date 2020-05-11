import withDb from '../../../../middleware/withDb';
import auth0 from '../../../../utils/auth0';

const handler = withDb(async (req, res) => {
  const {
    method,
    query: { band: slug },
  } = req;
  const { user } = await auth0.getSessionFromReq(req);

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

  switch (method) {
    case 'GET': {
      return res.json({
        band,
      });
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
});

export default auth0.requireAuthentication(handler);
