import { parseISO, format } from 'date-fns';

const collectionId = 'dc2eff91-626a-4d68-8abe-8b316cb25ac9';

const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-\&]+/g, '');

const formatValue = ({ type, value }) => {
  if (type === 'text' || type === 'title') return value.pop().pop();
  if (type === 'date') {
    const raw = value[0][1][0][1];

    return format(parseISO(raw.start_date), 'yyyy-MM-dd');
  }
  if (type === 'file') {
    const [filename, rawUrl] = value[0];
    return {
      filename,
      url: rawUrl[0][1],
    };
  }
  return value;
};

const maptoSchema = ({ properties, schema }) =>
  Object.keys(properties).reduce((memo, key) => {
    const { slug, type } = schema[key];
    const value = formatValue({ type, value: properties[key] });
    memo[slug] = value;
    return memo;
  }, {});

export default rawData => {
  const rawSchema = rawData.recordMap.collection[collectionId].value.schema;
  const schema = Object.keys(rawSchema).reduce((memo, key) => {
    memo[key] = {
      ...rawSchema[key],
      slug: slugify(rawSchema[key].name),
    };
    return memo;
  }, {});

  return rawData.result.blockIds
    .map(blockId => {
      const block = rawData.recordMap.block[blockId].value;
      const { id, properties } = block;
      if (!properties) return;
      return {
        id,
        ...maptoSchema({ properties, schema }),
      };
    })
    .filter(block => !!block); // Remove unmappable blocks
};
