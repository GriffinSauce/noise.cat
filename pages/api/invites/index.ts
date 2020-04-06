import { nanoid } from 'nanoid';
import nextConnect from 'next-connect';
import { ObjectId } from 'mongodb';
import middleware, { RequestWithDb } from '../../../middleware/db';
import auth0 from '../../../utils/auth0';

const generateInviteToken = () => {
  return nanoid(48);
};

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req: RequestWithDb, res: NextConnectResponse) => {
  const { user } = await auth0.getSessionFromReq(req);
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
    slug,
    token: generateInviteToken(),
  };
  await req.db.collection('invite').insertOne(invite);
  return res.json({
    invite,
  });
});

handler.get(async (req: RequestWithDb, res: NextConnectResponse) => {
  const { user } = await auth0.getSessionFromReq(req);
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

  // Delete invite
  await req.db.collection('invite').updateOne(
    {
      _id: new ObjectId(invite._id),
    },
    {
      $set: {
        deleted: new Date(),
      },
    },
  );

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
});

export default auth0.requireAuthentication(handler);
