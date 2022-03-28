import { nanoid } from 'nanoid';
import { addDays } from 'date-fns';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import withDb from 'middleware/withDb';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const generateInviteToken = () => {
  return nanoid(48);
};

// @ts-expect-error
const handler = withDb(async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      // Rate limit this route, max 10 calls per day per IP
      const userIP = req.headers['x-forwarded-for'];
      const rateLimiterMongo = new RateLimiterMongo({
        storeClient: req.dbClient,
        dbName: process.env.MONGO_DB,
        tableName: 'invitesRateLimit',
        points: 10, // Number of points
        duration: 60 * 60 * 24, // One day in seconds
      });
      try {
        await rateLimiterMongo.consume(userIP as string, 2); // consume 2 points
      } catch (rateLimiterRes) {
        console.info(
          `GET /api/invite was requested too many times by IP ${userIP}`,
        );
        return res.status(429).send('Too Many Requests');
      }

      const user = getSession(req, res)?.user;
      if (!user) {
        return res.status(403).json({
          error: `Unauthenticated`,
        });
      }
      const { slug, token } = req.query;
      const invite = await req.db.collection('invite').findOne({
        deleted: { $exists: false },
        slug,
        token,
      });
      if (!invite)
        return res.status(400).json({
          error: `Invite invalid`,
        });

      // Add member
      await req.db.collection('band').updateOne(
        {
          slug,
        },
        {
          $push: {
            members: user.sub,
          },
        },
      );

      return res.status(204).send('');
    }
    case 'POST': {
      const user = getSession(req, res)?.user;
      if (!user) {
        return res.status(403).json({
          error: `Unauthenticated`,
        });
      }
      const { slug } = req.body;
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

      const invite = {
        created: new Date(),
        creator: user.sub,
        expireAt: addDays(new Date(), 7), // Relies on 0 second TTL index
        slug,
        token: generateInviteToken(),
      };
      await req.db.collection('invite').insertOne(invite);
      return res.json({
        invite,
      });
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
});

export default withApiAuthRequired(handler);
