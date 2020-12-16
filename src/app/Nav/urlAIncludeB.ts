/* eslint-disable id-length */
import { notEmptyStr } from 'better-utils';

const urlAIncludeB = (a, b) => {
  if (notEmptyStr(a) && notEmptyStr(b)) {
    a = a.split('/');
    b = b.split('/');
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
