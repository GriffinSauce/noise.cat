import { Bands } from '../../../utils/db';

export default async function(req, res) {
  const bands = Bands.find();
  res.send({ bands });
}
