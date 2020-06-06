import fetcher from 'utils/fetcher'

const NOTION_TOKEN = process.env.LA_NOTION_TOKEN as string;
const BASEURL = 'https://www.notion.so/api/v3/';

const collectionId = 'dc2eff91-626a-4d68-8abe-8b316cb25ac9';

const req = {
  collectionId,
  collectionViewId: '6f0382d9-24e1-4397-87e0-e6634a46c373',
  query: {},
  loader: {
    type: 'table',
    limit: 70,
    userTimeZone: 'Europe/Berlin',
    userLocale: 'en',
    loadContentCover: false,
  },
};

function request({ endpoint, token }: { endpoint: string; token: string }):any {
  return fetcher<any>(`${BASEURL}${endpoint}`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/json',
      cookie: `token_v2=${token};`,
    },
    body: req,
  });
}

export default async () => {
  const data = await request({
    endpoint: 'queryCollection',
    token: NOTION_TOKEN,
  });
  return data;
};
