import { handleAuth, handleCallback, AfterCallback } from '@auth0/nextjs-auth0';
import { prisma } from 'utils/prisma';

const afterCallback: AfterCallback = async (_req, _res, session, _state) => {
  const userData = {
    externalId: session.user.sub as string,
    synced: new Date(),
    name: session.user.name as string,
    givenName: session.user.given_name,
    familyName: session.user.family_name,
    email: session.user.email as string,
    ...(session.user.picture
      ? {
          picture: session.user.picture as string,
        }
      : {}),
  };
  await prisma.user.upsert({
    where: {
      externalId: session.user.sub as string,
    },
    create: userData,
    update: userData,
  });
  return session;
};

export default handleAuth({
  async callback(req, res) {
    await handleCallback(req, res, { afterCallback });
  },
});
