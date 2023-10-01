import fetchCollection from './fetchCollection';
import toObject from './toObject';

type NotionShow = {
  date: string;
  showinfo: string;
  adress: string;
};

const mapColumns = (show: NotionShow): Show => ({
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

const notionApi = { get };

export default notionApi;
