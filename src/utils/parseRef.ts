import qs from 'qs';

const parseRef = (ref: string) => qs.parse(ref);

export default parseRef;
