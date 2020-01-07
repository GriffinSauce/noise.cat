import axios from 'axios';

const CS_API_URL = process.env.CS_API_URL;
if (!CS_API_URL) throw new Error('env var CS_API_URL is missing');

const mapColumns = show => ({
  date: show['Show datum'],
  title: show['Show naam'],
  location: show['Show locatie'],
  note: show['Show info'],
  contact: show['Contact info'],
  pay: show['Gage'],
  status: 'Bevestigd',

  // Unused
  // show["Opmerkingen"],
  // show["Wie"],
  // show["Actie datum"],
  // show["Actie"],
});

// Data fetching is hardcoded per-band
const getShows = async band => {
  if (band === 'coral-springs') {
    const { data } = await axios(CS_API_URL);
    return data.map(mapColumns);
  }
  if (band === 'left-alive') {
    return [];
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
