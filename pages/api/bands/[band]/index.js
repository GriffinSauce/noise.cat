import nextConnect from 'next-connect';
import middleware from '../../../../middleware/db';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const slug = req.query.band;
  let band = await req.db.collection('band').findOne({
    slug,
  });
  if (!band) return res.status(404);
  res.json({ band });
});

// Workaround for false positive "API resolved without sending a response"
export default (req, res) => handler.apply(req, res);
