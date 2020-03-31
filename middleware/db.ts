import '../utils/dotenv';
import { MongoClient, Db } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(
  process.env.MONGO_URI || 'mongodb://localhost:27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

export type RequestWithDb = NextConnectRequest & {
  dbClient: MongoClient;
  db: Db;
};

export type Middleware = {
  (req: RequestWithDb, res: NextConnectResponse, next: NextConnectNext): void;
};

const database: Middleware = async (req, res, next) => {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.MONGO_DB);
  return next();
};

const middleware = nextConnect();

middleware.use(database);

export default middleware;
