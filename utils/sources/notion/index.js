import fetchCollection from './fetchCollection';
import toObject from './toObject';

// date
// with
// adress
// showinfo
const mapColumns = show => ({
  date: show.date,
  title: show.showinfo,
  location: show.adress,
  note: '',
  contact: '',
  pay: '',
  status: 'Bevestigd',
});

const get = async () => {
  const data = await fetchCollection();
  const parsedData = toObject(data);
  return parsedData.map(mapColumns);
};

export default { get };
