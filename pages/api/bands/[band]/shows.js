import sheets from '../../../../utils/sources/sheets';
import notion from '../../../../utils/sources/notion';

// Data fetching is hardcoded per-band
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

export default async function shows(req, res) {
  const bandSlug = req.query.band;
  try {
    const shows = await getShows(bandSlug);
    res.send({ shows });
  } catch (err) {
    if (err.message === 'notFound') {
      return res.status(404).send({
        error: `No band by slug "${bandSlug}"`,
      });
    }
    throw err;
  }
}
