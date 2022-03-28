import withDb from 'middleware/withDb';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const handler = withDb(async (req, res) => {
  const {
    method,
    query: { band: slug },
  } = req;
  const user = getSession(req, res)?.user;
  if (!user) {
    return res.status(403).json({
      error: `Unauthenticated`,
    });
  }

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

export default withApiAuthRequired(handler);
