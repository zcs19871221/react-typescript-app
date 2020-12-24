import { Route } from './router';

const base = '/';
const tree: Route[] = [
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
    ],
  },
];
export { tree, base };
