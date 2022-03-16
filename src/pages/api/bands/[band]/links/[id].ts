import { ObjectID } from 'mongodb';
import withDb from 'middleware/withDb';
import auth0 from 'utils/auth0';

const handler = withDb(async (req, res) => {
  const {
    method,
    query: { band: slug, id },
  } = req;
  const user = auth0.getSession(req, res)?.user;
  if (!user) {
    return res.status(403).json({
      error: `Unauthenticated`,
    });
  }

  switch (method) {
    case 'PUT': {
      const { link } = req.body;
      if (!link)
        return res.status(400).json({
          error: `Link missing`,
        });

      // Allowed update props
      const { title, url } = link;
      if (!title)
        return res.status(400).json({
          error: `Title missing`,
        });

      if (!url)
        return res.status(400).json({
          error: `Url missing`,
        });

      // TODO: check update results
      await req.db.collection('band').updateOne(
        {
          slug,
          members: user.sub,
        },
        {
          $set: {
            'links.$[link].title': title,
            'links.$[link].url': url,
          },
        },
        { arrayFilters: [{ 'link._id': new ObjectID(id as string) }] },
      );

      return res.status(204).send('');
    }
    case 'DELETE': {
      // TODO: check update results
      await req.db.collection('band').updateOne(
        {
          slug,
          members: user.sub,
        },
        {
          $pull: {
            links: {
              _id: new ObjectID(id as string),
            },
          },
        },
      );

      return res.status(204).send('');
    }
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
});

export default auth0.withApiAuthRequired(handler);
