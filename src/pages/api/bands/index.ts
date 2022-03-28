import withDb from 'middleware/withDb';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

// @ts-expect-error
const handler = withDb(async (req, res) => {
  const { method } = req;
  const user = getSession(req, res)?.user;
  if (!user) {
    return res.status(403).json({
      error: `Unauthenticated`,
    });
  }

  switch (method) {
    case 'GET': {
      const bands = await req.db
        .collection('band')
        .find({
          members: user.sub,
        })
        .toArray();
      return res.status(200).json({
        bands,
      });
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
});

export default withApiAuthRequired(handler);
