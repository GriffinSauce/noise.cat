import nextConnect from 'next-connect';
import middleware, { RequestWithDb } from '../../../../middleware/db';
import auth0 from '../../../../utils/auth0';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req: RequestWithDb, res: NextConnectResponse) => {
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

  const { link } = req.body;
  if (!link)
    return res.status(400).json({
      error: `Link missing`,
    });

  if (!link.title)
    return res.status(400).json({
      error: `Title missing`,
    });

  if (!link.url)
    return res.status(400).json({
      error: `Url missing`,
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
          created: new Date(),
          creatorId: user.sub,
        },
      },
    },
  );

  return res.status(204).send('');
});

export default auth0.requireAuthentication(handler);
