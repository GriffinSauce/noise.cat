import nextConnect from 'next-connect';
import middleware, { RequestWithDb } from '../../../../middleware/db';
import auth0 from '../../../../utils/auth0';
import sheets from '../../../../utils/sources/sheets';
import notion from '../../../../utils/sources/notion';

// Data fetching is hardcoded per-band for now
const getShows = async (slug: string) => {
  if (slug === 'coral-springs') {
    return sheets.get();
  }
  if (slug === 'left-alive') {
    return notion.get();
  }
  throw new Error('notFound');
};

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: RequestWithDb, res: NextConnectResponse) => {
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

  try {
    const shows = await getShows(slug);
    return res.json({
      shows,
    });
  } catch (err) {
    if (err.message === 'notFound') {
      return res.status(404).json({
        error: `No band by slug "${slug}"`,
      });
    }
    throw err;
  }
});

export default auth0.requireAuthentication(handler);
