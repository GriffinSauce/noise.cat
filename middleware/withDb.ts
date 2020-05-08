import '../utils/dotenv';
import { MongoClient, Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const client = new MongoClient(
  process.env.MONGO_URI || 'mongodb://localhost:27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

export type RequestWithDb = NextApiRequest & {
  dbClient: MongoClient;
  db: Db;
};

type Handler = (req: RequestWithDb, res: NextApiResponse) => Promise<void>;

const withDb = (handler: Handler) => async (
  req: NextApiRequest & {
    dbClient?: MongoClient;
    db?: Db;
  },
  res: NextApiResponse,
) => {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.MONGO_DB);
  return handler(req as RequestWithDb, res);
};

export default withDb;
