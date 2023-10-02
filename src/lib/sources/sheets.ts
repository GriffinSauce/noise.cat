import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Huehue
type SheetShow = {
  'Show datum': string;
  'Show naam': string;
  'Show locatie': string;
  'Show info': string;
  'Contact info': string;
  Gage: string;
};

const mapColumns = (show: Partial<SheetShow>): Show => ({
  date: show['Show datum'] || '',
  title: show['Show naam'] || '',
  location: show['Show locatie'] || '',
  note: show['Show info'] || '',
  contact: show['Contact info'] || '',
  pay: show.Gage || '',
  status: 'Bevestigd',

  // Unused
  // show["Opmerkingen"],
  // show["Wie"],
  // show["Actie datum"],
  // show["Actie"],
});

const get = async () => {
  if (!process.env.CS_GOOGLE_CLIENT_EMAIL)
    throw new Error('env var CS_GOOGLE_CLIENT_EMAIL is missing');
  if (!process.env.CS_GOOGLE_PRIVATE_KEY)
    throw new Error('env var CS_GOOGLE_PRIVATE_KEY is missing');
  if (!process.env.CS_SHEET_ID)
    throw new Error('env var CS_SHEET_ID is missing');

  const jwt = new JWT({
    email: process.env.CS_GOOGLE_CLIENT_EMAIL,
    key: process.env.CS_GOOGLE_PRIVATE_KEY,
    scopes: SCOPES,
  });
  const doc = new GoogleSpreadsheet(process.env.CS_SHEET_ID, jwt);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle['Bevestigd']; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  await sheet.loadHeaderRow(3);

  const rows = await sheet.getRows<SheetShow>();

  return rows.map((row) => mapColumns(row.toObject()));
};

const sheetsApi = { get };

export default sheetsApi;
