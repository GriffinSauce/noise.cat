import nextConnect from 'next-connect';
import { ManagementClient } from 'auth0';
import middleware from '../../../../middleware/db';
import auth0 from '../../../../utils/auth0';

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENTID,
  clientSecret: process.env.AUTH0_SECRET,
  scope: 'read:users update:users',
});

const handler = nextConnect();

handler.use(middleware);

const selectFields = (...keys) => obj => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
};

handler.get(async (req, res) => {
  const { user } = await auth0.getSession(req);
  const slug = req.query.band;
  let band = await req.db.collection('band').findOne({
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
    q: band.members.map(id => `user_id:${id}`).join(' OR '),
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

  res.json({ members, ids: band.members });
});

handler.put(async (req, res) => {
  const { user } = await auth0.getSession(req);
  const slug = req.query.band;

  let band = await req.db.collection('band').findOne({
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
  const update = await req.db.collection('band').updateOne(
    {
      slug,
    },
    {
      $set: {
        members,
      },
    },
  );

  res.status(204).send('');
});

const appliedHandler = (req, res) => handler.apply(req, res); // Workaround for false positive "API resolved without sending a response"
export default auth0.requireAuthentication(appliedHandler);
