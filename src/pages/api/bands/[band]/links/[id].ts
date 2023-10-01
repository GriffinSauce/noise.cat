import { ObjectId } from 'mongodb';
import withDb from 'middleware/withDb';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

// @ts-expect-error
const handler = withDb(async (req, res) => {
  const {
    method,
    query: { band: slug, id },
  } = req;
  const session = await getSession(req, res);
  const user = session?.user;
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
        { arrayFilters: [{ 'link._id': new ObjectId(id as string) }] },
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
              _id: new ObjectId(id as string),
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

export default withApiAuthRequired(handler);
