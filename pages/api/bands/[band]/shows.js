import nextConnect from 'next-connect';
import middleware from '../../../../middleware/db';
import auth0 from '../../../../utils/auth0';
import sheets from '../../../../utils/sources/sheets';
import notion from '../../../../utils/sources/notion';

// Data fetching is hardcoded per-band for now
const getShows = async band => {
  if (band === 'coral-springs') {
    return sheets.get();
  }
  if (band === 'left-alive') {
    return notion.get();
  }
  if (band === 'all') {
    const [csShows, laShows] = await Promise.all([sheets.get(), notion.get()]);
    return csShows.concat(laShows);
  }
  throw new Error('notFound');
};

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

  try {
    const shows = await getShows(slug);
    return res.json({ shows });
  } catch (err) {
    if (err.message === 'notFound') {
      return res.status(404).json({
        error: `No band by slug "${slug}"`,
      });
    }
    throw err;
  }
});

const appliedHandler = (req, res) => handler.apply(req, res); // Workaround for false positive "API resolved without sending a response"
export default auth0.requireAuthentication(appliedHandler);
