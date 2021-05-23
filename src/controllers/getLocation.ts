import parseRef from '../utils/parseRef';
import getDocumentByID from '../utils/getDocumentByID';

type MaybeParent = {
  location?: string;
};

type Args = {
  ref: string;
}

const getLocation = async (parent: MaybeParent, args: Args) => {
  const id = parent && parent.location ? parent.location : parseRef(args.ref).id;
  return getDocumentByID(id as string, 'locations');
};

export default getLocation;
