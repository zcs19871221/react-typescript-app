import { isDev } from 'Src/settings';
import buildRoute, { devDirs } from './route';

const getDirs = roleId => {
  roleId = isDev ? 'dev' : String(roleId);
  const [, dirMap] = buildRoute({ dirs: 'all' });
  switch (roleId) {
    case 'dev':
      return 'all';
    case '0':
      return Object.keys(dirMap)
        .filter(each => !devDirs.includes(each))
        .filter(
          each =>
            ![
              'custom',
              'category',
              'demand',
              'remindOrigin',
              'remindKeyWord',
              'remindGroup',
              'auth',
            ].includes(each),
        );
    default:
      return Object.keys(dirMap).filter(each => !devDirs.includes(each));
  }
};

export default getDirs;
