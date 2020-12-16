import { isString, isArray, isObject } from 'better-utils';

const base = '/contentMonitor';
const fullTree = [
  {
    url: '/_test',
    name: '测试',
    dir: 'test',
  },
  {
    url: '/_agent',
    name: '代理管理',
    dir: 'agent',
  },
  {
    url: '/monitPush',
    name: 'PUSH监控',
    dir: 'monitPush',
  },
  {
    url: '/monitWeiBo',
    name: '微博监控',
    dir: 'monitWeiBo',
  },
  {
    url: '/monitPC',
    name: 'PC滚动监控',
    dir: 'monitPC',
  },
  {
    url: '/monitImportant',
    name: '重点竞品监控',
    dir: 'monitImportant',
  },
  {
    url: '/monitSearch',
    name: '监控搜索',
    dir: 'monitSearch',
  },
  {
    url: '/monitConfig',
    name: '监控定制',
    child: [
      {
        url: '/custom',
        name: '来源定制',
        dir: 'custom',
      },
      {
        url: '/category',
        name: '分类配置',
        dir: 'category',
      },
      {
        url: '/demand',
        name: '来源需求',
        dir: 'demand',
      },
    ],
  },
  {
    url: '/remind',
    name: '提醒设置',
    child: [
      {
        url: '/origin',
        name: '源更新',
        dir: 'remindOrigin',
      },
      {
        url: '/keyword',
        name: '关键词',
        dir: 'remindKeyWord',
      },
      {
        url: '/group',
        name: '分组',
        dir: 'remindGroup',
      },
    ],
  },
  {
    url: '/remindHistory',
    name: '提醒历史',
    dir: 'remindHistory',
  },
  {
    url: '/auth',
    name: '权限设置',
    dir: 'auth',
  },
];
const init = (
  {
    url,
    name,
    child = [],
    dir,
    componentKey = 'Router',
    reducerKey = 'reducer',
  },
  dirMap,
  urlMap,
  parent,
) => {
  if (
    !isString(url) ||
    !url ||
    !isString(name) ||
    !name ||
    !isArray(child) ||
    (dir !== undefined && !isString(dir))
  ) {
    throw new Error('参数错误');
  }
  url = `${parent}/${url}`.replace(/\/+/gu, '/');
  if (urlMap[url]) {
    throw new Error(`重复url:${url}`);
  }
  if (child.length === 0 && !dir) {
    throw new Error(`叶子节点必须设置dir对应组件:${url}`);
  }
  if (dir && dirMap[dir]) {
    throw new Error(`重复domain下文件夹:${dir}`);
  }
  urlMap[url] = true;
  return { url, name, child, dir, componentKey, reducerKey };
};
// eslint-disable-next-line max-lines-per-function
const buildRoute = ({
  dirs,
  trees = fullTree,
  parent = base,
  urlMap = {},
  dirMap = {},
} = {}) => {
  if (
    !isArray(trees) ||
    (dirs !== 'all' && !isArray(dirs)) ||
    !isString(parent) ||
    !parent.startsWith('/') ||
    !isObject(urlMap) ||
    !isObject(dirMap)
  ) {
    throw new Error('参数错误');
  }
  return [
    trees
      .map(each => {
        const { url, name, child, dir, componentKey, reducerKey } = init(
          each,
          dirMap,
          urlMap,
          parent,
        );
        if (dir) {
          if (dirs === 'all' || dirs.includes(dir)) {
            dirMap[dir] = { url, componentKey, reducerKey };
          } else {
            return null;
          }
        }
        const tree = { name, url, child: [] };
        if (child.length > 0) {
          const [sub] = buildRoute({
            dirs,
            trees: child,
            urlMap,
            parent: url,
            dirMap,
          });
          if (!dir && sub.length === 0) {
            return null;
          }
          tree.child = sub;
        }
        return tree;
      })
      .filter(Boolean),
    dirMap,
  ];
};

export default buildRoute;
export const devDirs = ['test', 'agent'];
