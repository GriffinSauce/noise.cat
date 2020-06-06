import fetcher from 'utils/fetcher';

const CS_API_URL = process.env.CS_API_URL; // eslint-disable-line prefer-destructuring

// Huehue
type SheetShow = {
  'Show datum': string;
  'Show naam': string;
  'Show locatie': string;
  'Show info': string;
  'Contact info': string;
  Gage: string;
};

const mapColumns = (show: SheetShow) => ({
  date: show['Show datum'],
  title: show['Show naam'],
  location: show['Show locatie'],
  note: show['Show info'],
  contact: show['Contact info'],
  pay: show.Gage,
  status: 'Bevestigd',

  // Unused
  // show["Opmerkingen"],
  // show["Wie"],
  // show["Actie datum"],
  // show["Actie"],
});

const get = async () => {
  if (!CS_API_URL) throw new Error('env var CS_API_URL is missing');
  const data = await fetcher<any>(CS_API_URL);
  return data.map(mapColumns);
};

export default { get };
