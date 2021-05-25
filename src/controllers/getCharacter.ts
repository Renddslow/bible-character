import getDocumentByID from '../utils/getDocumentByID';

type Args = {
  id: string;
}

const getCharacter = (parent, args: Args) => {
  const { id } = args;
  return getDocumentByID(id as string, 'characters');
};

export default getCharacter;
