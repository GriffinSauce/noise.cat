import nextConnect from 'next-connect';
import middleware from '../../../middleware/db';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let bands = await req.db
    .collection('band')
    .find()
    .toArray();
  res.json({ bands });
});

// Workaround for false positive "API resolved without sending a response"
export default (req, res) => handler.apply(req, res);
