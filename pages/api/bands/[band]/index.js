// Who needs databases anyway?
const map = {
  'coral-springs': {
    name: 'Coral Springs',
  },
  'left-alive': {
    name: 'Left Alive',
  },
};

export default async function band(req, res) {
  const bandSlug = req.query.band;
  const band = map[bandSlug];
  if (!band) {
    return res.status(404).send({
      error: `No band by slug "${bandSlug}"`,
    });
  }
  res.send({ band });
}
