import nextConnect from 'next-connect';
import middleware from '../../../../middleware/db';
import auth0 from '../../../utils/auth0';

const handler = nextConnect();

handler.use(middleware);

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
  res.json({ band });
});

const appliedHandler = (req, res) => handler.apply(req, res); // Workaround for false positive "API resolved without sending a response"
export default auth0.requireAuthentication(appliedHandler);
