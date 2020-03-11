// Who needs databases anyway?
const data = {
  'coral-springs': {
    slug: 'coral-springs',
    name: 'Coral Springs',
    image: '/band-coral-springs.jpg',
  },
  'left-alive': {
    slug: 'left-alive',
    name: 'Left Alive',
    image: '/band-left-alive.png',
  },
};

export const Bands = {
  find: () => Object.keys(data).map(slug => data[slug]),
  findOne: slug => data[slug],
};
