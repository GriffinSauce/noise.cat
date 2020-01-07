// Who needs databases anyway?
const data = {
  all: {
    slug: 'all',
    name: 'All (unsorted)',
  },
  'coral-springs': {
    slug: 'coral-springs',
    name: 'Coral Springs',
  },
  'left-alive': {
    slug: 'left-alive',
    name: 'Left Alive',
  },
};

export const Bands = {
  find: () => Object.keys(data).map(slug => data[slug]),
  findOne: slug => data[slug],
};
