import nextConnect from 'next-connect';
import { ManagementClient } from 'auth0';
import middleware, { RequestWithDb } from '../../../../middleware/db';
import auth0 from '../../../../utils/auth0';

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENTID as string,
  clientSecret: process.env.AUTH0_SECRET as string,
  scope: 'read:users update:users',
});

const handler = nextConnect();

handler.use(middleware);

type Obj = {
  [key: string]: any; // eslint-disable-line
};

const selectFields = (...keys: Array<string>) => (obj: Obj) => {
  return keys.reduce((acc: Obj, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
};

handler.get(async (req: RequestWithDb, res: NextConnectResponse) => {
  // @ts-ignore
  const { user } = await auth0.getSession(req);
  const slug = req.query.band;
  const band = await req.db.collection('band').findOne<Band>({
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

  // Fetch members data from auth0
  const membersUnsafe = await management.getUsers({
    q: band.members.map((id) => `user_id:${id}`).join(' OR '),
  });
  const members = membersUnsafe.map(
    selectFields(
      'user_id',
      'name',
      'email',
      'given_name',
      'family_name',
      'picture',
    ),
    // Available fields: created_at email email_verified family_name given_name identities locale name nickname picture updated_at user_id last_login last_ip logins_count
  );

  return res.json({
    members,
    ids: band.members,
  });
});

handler.put(async (req: RequestWithDb, res: NextConnectResponse) => {
  // @ts-ignore
  const { user } = await auth0.getSession(req);
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

  const { members } = req.body;
  if (!members || !members.length)
    return res.status(400).json({
      error: `No empty members allowed, delete the band instead`,
    });

  // TODO: check update result
  await req.db.collection('band').updateOne(
    {
      slug,
    },
    {
      $set: {
        members,
      },
    },
  );

  return res.status(204).send('');
});

export default auth0.requireAuthentication(handler);
