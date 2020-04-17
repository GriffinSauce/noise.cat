import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb';
import middleware, { RequestWithDb } from '../../../../../middleware/db';
import auth0 from '../../../../../utils/auth0';

const handler = nextConnect();

handler.use(middleware);

handler.put(async (req: RequestWithDb, res: NextConnectResponse) => {
  const { user } = await auth0.getSessionFromReq(req);

  const { band: slug, id } = req.query;

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
    { arrayFilters: [{ 'link._id': new ObjectID(id) }] },
  );

  return res.status(204).send('');
});

handler.delete(async (req: RequestWithDb, res: NextConnectResponse) => {
  const { user } = await auth0.getSessionFromReq(req);

  const { band: slug, id } = req.query;

  // TODO: check update results
  await req.db.collection('band').updateOne(
    {
      slug,
      members: user.sub,
    },
    {
      $pull: {
        links: {
          _id: new ObjectID(id),
        },
      },
    },
  );

  return res.status(204).send('');
});

export default auth0.requireAuthentication(handler);
