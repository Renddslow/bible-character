import getDocumentByID from '../utils/getDocumentByID';
import parseRef from '../utils/parseRef';

type Args = {
  ref: string;
}

const getCharacter = (args: Args) => {
  const { id } = parseRef(args.ref);
  return getDocumentByID(id as string, 'characters');
};

export default getCharacter;
