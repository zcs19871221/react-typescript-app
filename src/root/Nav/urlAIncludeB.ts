/* eslint-disable id-length */
import { notEmptyStr } from 'better-utils';

const urlAIncludeB = (urlA: string, urlB: string) => {
  if (notEmptyStr(urlA) && notEmptyStr(urlA)) {
    const a = urlA.split('/');
    const b = urlB.split('/');
    for (let i = 0, len = b.length; i < len; i += 1) {
      if (b[i] !== a[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export default urlAIncludeB;
