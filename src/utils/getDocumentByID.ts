import fs from 'fs';
import { promisify } from 'util';
import yaml from 'yaml';

import grep from './grep';

const read = promisify(fs.readFile);

const getDocumentByID = async (id: string, type?: 'characters' | 'locations') => {
  if (!type) {
    console.warn('You are searching the whole data folder with no type specifier. This can be slow.');
  }
  const dir = await grep(`"id: ${id}"`, type || '/');

  if (!dir) return null;

  const doc = (await read(dir[0])).toString();
  return {
    ...yaml.parse(doc),
    datasetPath: dir[0],
  };
};

export default getDocumentByID;
