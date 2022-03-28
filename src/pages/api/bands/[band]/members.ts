import { ManagementClient } from 'auth0';
import withDb from 'middleware/withDb';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

type Obj = {
  [key: string]: any; // eslint-disable-line
};

const selectFields =
  (...keys: Array<string>) =>
  (obj: Obj) => {
    return keys.reduce((acc: Obj, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  };

const authDomain = (process.env.AUTH0_ISSUER_BASE_URL as string).replace(
  'https://',
  '',
);

const management = new ManagementClient({
  domain: authDomain,
  clientId: process.env.AUTH0_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
  scope: 'read:users update:users',
});

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

  switch (method) {
    case 'GET': {
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
    }
    case 'PUT': {
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
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
});

export default withApiAuthRequired(handler);
