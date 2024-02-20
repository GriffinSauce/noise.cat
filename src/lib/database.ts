import { Db } from 'mongodb';
import clientPromise from './mongodb';

export const getDatabase = async (): Promise<Db> => {
  const client = await clientPromise;
  return client.db(process.env.MONGO_DB);
};

export const getBands = async ({ userId }: { userId: string }) => {
  const db = await getDatabase();
  return db
    .collection<Band>('band')
    .find({
      members: userId,
    })
    .toArray();
};
