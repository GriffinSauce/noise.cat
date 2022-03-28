import withDb from 'middleware/withDb';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import sheets from 'utils/sources/sheets';
import airtable from 'utils/sources/airtable';

// Data fetching is hardcoded per-band for now
const getShows = async (slug: string) => {
  if (slug === 'coral-springs') {
    return sheets.get();
  }
  if (slug === 'left-alive') {
    return airtable.get();
  }
  throw new Error('notFound');
};

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
      try {
        const shows = await getShows(slug as string);
        return res.json({
          shows,
        });
      } catch (err) {
        if (err instanceof Error && err.message === 'notFound') {
          return res.status(404).json({
            error: `No band by slug "${slug}"`,
          });
        }
        throw err;
      }
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
});

export default withApiAuthRequired(handler);
