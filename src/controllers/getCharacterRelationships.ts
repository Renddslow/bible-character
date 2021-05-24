import fs from 'fs';
import { promisify } from 'util';
import yaml from 'yaml';
import arrayUnion from 'array-union';
import unique from '@arr/unique';

const read = promisify(fs.readFile);

import grep from '../utils/grep';

type Args = {
  first: number;
  after: string;
  last: number;
  before: string;
  relationshipType: string;
};

const getSiblingsByType = async (type: string, id: string, filterPath: string) => {
  const search = await grep(`"${type}: ${id}"`, 'characters');
  const files = await Promise.all(
    search.filter((p) => p !== filterPath).map(async (p) => (await read(p)).toString()),
  );

  return files.map((p) => {
    const { id } = yaml.parse(p as string);
    return id;
  });
};

const getCharacterRelationships = async (parent, args: Args) => {
  if (!parent.relationships) {
    return null;
  }

  const relationships = Object.keys(parent.relationships).map((key) => ({
    relationshipType: key,
    id: parent.relationships[key],
  }));

  const paternalSiblings = [];
  const maternalSiblings = [];

  if (parent.relationships.father) {
    paternalSiblings.push(
      ...(await getSiblingsByType('father', parent.relationships.father, parent.datasetPath)),
    );
  }

  if (parent.relationships.mother) {
    maternalSiblings.push(
      ...(await getSiblingsByType('mother', parent.relationships.mother, parent.datasetPath)),
    );
  }

  const siblings = arrayUnion(paternalSiblings, maternalSiblings);
  const halfSiblings = unique(
    [...maternalSiblings, ...paternalSiblings].filter((s) => !siblings.includes(s)),
  ).map((id) => ({ relationshipType: 'half_sibling', id }));

  relationships.push(...halfSiblings);
  relationships.push(...siblings.map((id) => ({ id, relationshipType: 'sibling' })));

  return {
    edges: relationships,
  };
};

export default getCharacterRelationships;
