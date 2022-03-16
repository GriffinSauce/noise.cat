import withDb from 'middleware/withDb';
import auth0 from 'utils/auth0';

const handler = withDb(async (req, res) => {
  const { method } = req;
  const user = auth0.getSession(req, res)?.user;
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

export default auth0.withApiAuthRequired(handler);
