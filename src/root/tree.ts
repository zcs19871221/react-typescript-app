import { MenuConfig } from './router';

const base = '/';
const fullTree: MenuConfig[] = [
  {
    path: 'test',
    name: '测试',
    type: 'composite',
    child: [
      {
        path: '1',
        name: '测试1',
        dir: 'test',
        type: 'leaf',
      },
      {
        path: '2',
        name: '测试2',
        dir: 'test2',
        type: 'leaf',
      },
    ],
  },
];
export { fullTree, base };
