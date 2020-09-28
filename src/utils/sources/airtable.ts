import { initialize, get } from 'luft';

const apiKey = process.env.LA_AIRTABLE_API_KEY;
if (!apiKey) throw new Error('env var LA_AIRTABLE_API_KEY is missing');

initialize({
  baseId: 'appfUKrkbUfTkWvyh',
  apiKey,
});

type AirtableShow = {
  title: string;
  date: string;
  doors: string;
  notes: string;
  venue: {
    name: string;
    address: string;
  };
  price: string;
  publicDescription: string;
  eventLink: string;
  images: string;
  created: string;
  status: string;
};

const getUpcomingShows = async (): Promise<AirtableShow[]> => {
  const records = await get('Shows', {
    sort: [{ field: 'Date', direction: 'desc' }],
    populate: [
      {
        path: 'Venue',
        from: 'Venues',
        multi: false,
        fields: ['Address', 'City', 'Name'],
      },
      { path: 'With', from: 'Bands', multi: true, fields: ['Name'] },
    ],
    filter: 'IS_AFTER({Date}, NOW())',
    toObject: true,
  });
  return records as AirtableShow[];
};

const mapColumns = (show: AirtableShow): Show => ({
  date: show.date,
  title: show.title,
  location: show.venue.address,
  note: show.notes,
  contact: '',
  pay: '',
  status: show.status,
});

const getShows = async (): Promise<Show[]> => {
  const airtableShows = await getUpcomingShows();
  return airtableShows.map(mapColumns);
};

export default { get: getShows };
