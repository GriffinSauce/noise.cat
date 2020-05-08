import { ObjectId } from 'mongodb';
import withDb from '../../../../../middleware/withDb';
import auth0 from '../../../../../utils/auth0';

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
    case 'POST': {
      const { link } = req.body;

      // TODO: use something a little more robust here
      let error;
      if (!link) error = `Link missing`;
      if (!link.title) error = `Title missing`;
      if (!link.url) error = `Url missing`;
      if (error)
        return res.status(400).json({
          error,
        });

      // TODO: check update result
      await req.db.collection('band').updateOne(
        {
          slug,
        },
        {
          $push: {
            links: {
              ...link,
              _id: new ObjectId(),
              created: new Date(),
              creatorId: user.sub,
            },
          },
        },
      );

      return res.status(204).send('');
    }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
});

export default auth0.requireAuthentication(handler);
