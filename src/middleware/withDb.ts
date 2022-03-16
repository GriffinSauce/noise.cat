import { MongoClient, Db } from 'mongodb';
import clientPromise from '../utils/mongodb';

export type RequestWithDb = NextApiRequest & {
  dbClient: MongoClient;
  db: Db;
};

type Handler = (req: RequestWithDb, res: NextApiResponse) => Promise<void>;

const withDb =
  (handler: Handler) =>
  async (
    req: NextApiRequest & {
      dbClient?: MongoClient;
      db?: Db;
    },
    res: NextApiResponse,
  ) => {
    const client = await clientPromise;
    req.dbClient = client;
    req.db = client.db(process.env.MONGO_DB);
    return handler(req as RequestWithDb, res);
  };

export default withDb;
