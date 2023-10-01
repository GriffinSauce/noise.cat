/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This is a stopgap hack until Notion API becomes available, wild west it a little bit
 */

import { parseISO, format } from 'date-fns';

const collectionId = 'dc2eff91-626a-4d68-8abe-8b316cb25ac9';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-&]+/g, '');

type PropertyType = 'text' | 'title' | 'date' | 'file';
type Date = {
  type: string;
  start_date: string;
};
type Property =
  | {
      type: 'text' | 'title';
      value: [[string]];
    }
  | {
      type: 'date';
      value: [[string, [[string, Date]]]];
    }
  | {
      type: 'file';
      value: [[string, [string, [string, string]]]];
    };

const formatValue = ({ type, value }: Property): any => {
  if (type === 'text' || type === 'title') return value?.pop()?.pop();
  if (type === 'date') {
    const raw = value?.[0]?.[1]?.[0]?.[1] as Date;
    return format(parseISO(raw.start_date), 'yyyy-MM-dd');
  }
  if (type === 'file') {
    const [filename, rawUrl] = value[0];
    return {
      filename,
      url: rawUrl?.[0][1],
    };
  }
  return value;
};

const maptoSchema = ({
  properties,
  schema,
}: {
  properties: any;
  schema: any;
}) =>
  Object.keys(properties).reduce((memo: any, key: string) => {
    const { slug, type } = schema[key] as { slug: string; type: PropertyType };
    const value = formatValue({
      type,
      value: properties[key],
    });
    memo[slug] = value; // eslint-disable-line no-param-reassign
    return memo;
  }, {});

const toObject = (rawData: any) => {
  const rawSchema = rawData.recordMap.collection[collectionId].value.schema;
  const schema = Object.keys(rawSchema).reduce((memo: any, key: string) => {
    // eslint-disable-next-line no-param-reassign
    memo[key] = {
      ...rawSchema[key],
      slug: slugify(rawSchema[key].name),
    };
    return memo;
  }, {});

  return rawData.result.blockIds
    .map((blockId: string) => {
      const block = rawData.recordMap.block[blockId].value;
      const { id, properties } = block;
      if (!properties) return null;
      return {
        id,
        ...maptoSchema({ properties, schema }),
      };
    })
    .filter((block: null | object) => !!block); // Remove unmappable blocks
};

export default toObject;
