import buildTree from './tree';

it('tree', () => {
  const trees = [
    {
      url: '/test',
      name: '测试',
      child: [
        {
          dir: 'redux',
          name: '测试组件',
          url: '/redux',
        },
        {
          dir: 'react',
          name: 'react组件',
          url: '/react',
        },
      ],
    },
    {
      url: '/todo',
      name: 'todolist',
      child: [
        {
          dir: 'list',
          name: 'list',
          url: '/list',
        },
        {
          dir: 'show',
          name: 'react组件',
          url: '/show',
          child: [
            {
              dir: 'red',
              name: 'red',
              url: '/red',
            },
            {
              dir: 'green',
              name: 'green',
              url: '/green',
            },
          ],
        },
      ],
    },
  ];
  const [tree, map] = buildTree({
    dirs: ['list', 'show', 'red'],
    trees,
  });
  expect(tree).toEqual([
    {
      url: '/todo',
      name: 'todolist',
      child: [
        {
          name: 'list',
          url: '/todo/list',
        },
        {
          name: 'react组件',
          url: '/todo/show',
          child: [
            {
              name: 'red',
              url: '/todo/show/red',
            },
          ],
        },
      ],
    },
  ]);
  expect(map).toEqual({
    list: {
      url: '/todo/list',
      dir: 'list',
    },
    show: {
      url: '/todo/show',
      dir: 'show',
    },
    red: {
      url: '/todo/show/red',
      dir: 'red',
    },
  });
});
