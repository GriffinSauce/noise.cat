import { Bands } from '../../../../utils/db';

export default async function band(req, res) {
  const bandSlug = req.query.band;
  const band = Bands.findOne(bandSlug);
  if (!band) {
    return res.status(404).send({
      error: `No band by slug "${bandSlug}"`,
    });
  }
  res.send({ band });
}
