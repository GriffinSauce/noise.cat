import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextApiHandler, NextApiResponse } from 'next';
import { prisma } from 'utils/prisma';

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  const user = getSession(req, res)?.user;
  if (!user) {
    return res.status(403).json({
      error: `Unauthenticated`,
    });
  }

  switch (method) {
    case 'GET': {
      const bands =
        (await prisma.user
          .findUnique({ where: { externalId: user.sub } })
          .bands()) || [];

      return res.status(200).json({
        bands,
      });
    }
    case 'POST': {
      const { name, slug } = req.body;

      // Create via user.update so we can find the user by externalId but connect by db id
      const updatedUser = await prisma.user.update({
        where: {
          externalId: user.sub,
        },
        data: {
          bands: {
            create: {
              name: name as string, // TODO: validate
              slug: slug as string, // TODO: validate
            },
          },
        },
        include: {
          bands: true, // Include all bands in return value
        },
      });

      const band = updatedUser.bands.find((band) => band.name === name);
      return res.json({ band });
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
};

export default withApiAuthRequired(handler);
