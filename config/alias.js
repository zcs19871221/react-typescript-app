const path = require('path');

const alias = {
  Root: '',
  Src: 'src',
  Asset: 'src/asset',
  Dom: 'src/domain',
  Com: 'src/component',
  Util: 'src/utils',
  Ajax: 'src/ajax',
  Hooks: 'src/hooks',
  IF: 'src/interface',
};
const root = path.join(__dirname, '../');

const webpackAlias = (() => {
  const map = {};
  const keys = Object.keys(alias);
  if (keys.length > 0) {
    keys.forEach(key => {
      map[key] = path.join(root, alias[key]);
    });
  }
  return map;
})();

const jestAlias = {};
Object.keys(alias).forEach(key => {
  jestAlias[`^${key}(.*)$`] = `<rootDir>/${alias[key]}/$1`;
});

const eslintAlias = Object.keys(alias).map(key => [
  `^${key}`,
  `./${alias[key]}`,
]);
module.exports = {
  webpackAlias,
  eslintAlias,
  jestAlias,
};
