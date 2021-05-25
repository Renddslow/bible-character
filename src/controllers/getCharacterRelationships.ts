import fs from 'fs';
import { promisify } from 'util';
import yaml from 'yaml';
import unique from '@arr/unique';

const read = promisify(fs.readFile);

import grep from '../utils/grep';
import getDocumentByID from '../utils/getDocumentByID';

type Args = {
  first: number;
  after: string;
  last: number;
  before: string;
  relationshipType: string;
};

type Relationship = {
  id: string;
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

const getSiblings = async (
  father: string,
  mother: string,
  datasetPath: string,
): Promise<{ halfSiblings: Relationship[]; siblings: Relationship[] }> => {
  const paternalSiblings = [];
  const maternalSiblings = [];

  if (father) {
    paternalSiblings.push(...(await getSiblingsByType('father', father, datasetPath)));
  }

  if (mother) {
    maternalSiblings.push(...(await getSiblingsByType('mother', mother, datasetPath)));
  }

  const halfSiblings = unique([
    ...paternalSiblings.filter((p) => !maternalSiblings.includes(p)),
    ...maternalSiblings.filter((p) => !paternalSiblings.includes(p)),
  ]);

  const siblings = unique([...paternalSiblings, ...maternalSiblings]).filter(
    (s) => !halfSiblings.includes(s),
  );

  const type = (relationshipType: string) => (id: string) => ({ id, relationshipType });
  return {
    halfSiblings: halfSiblings.map(type('half_sibling')),
    siblings: siblings.map(type('sibling')),
  };
};

const getParentFamily = async (parentID: string) => {
  const relationships = [];
  const parent = await getDocumentByID(parentID, 'characters');
  if (parent && parent.relationships) {
    const motherSiblings = await getSiblings(
      parent.relationships.father,
      parent.relationships.mother,
      parent.datasetPath,
    );
    relationships.push(
      ...motherSiblings.halfSiblings.map((p) => ({ ...p, relationshipType: 'parent_sibling' })),
    );
    relationships.push(
      ...motherSiblings.siblings.map((p) => ({ ...p, relationshipType: 'parent_sibling' })),
    );
    relationships.push({
      relationshipType: 'grandfather',
      id: parent.relationships.father,
    });
    relationships.push({
      relationshipType: 'grandmother',
      id: parent.relationships.mother,
    });
  }
  return relationships;
};

const getCharacterRelationships = async (parent, args: Args) => {
  if (!parent.relationships) {
    return null;
  }

  const relationships: Relationship[] = Object.keys(parent.relationships).map((key) => ({
    relationshipType: key,
    id: parent.relationships[key],
  }));

  const { halfSiblings, siblings } = await getSiblings(
    parent.relationships.father,
    parent.relationships.mother,
    parent.datasetPath,
  );

  relationships.push(...halfSiblings);
  relationships.push(...siblings);

  const fatherRelationships = await getParentFamily(parent.relationships.father);
  relationships.push(...fatherRelationships);
  const motherRelationships = await getParentFamily(parent.relationships.mother);
  relationships.push(...motherRelationships);

  return {
    edges: relationships,
  };
};

export default getCharacterRelationships;
