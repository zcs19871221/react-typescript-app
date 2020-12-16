import store from 'Src/store';

const createComponentMap = () => {
  const context = require.context('Dom/', true, /index\.js$/u);
  const componentMap = {};
  context.keys().forEach(str => {
    const match = str.match(/^\.\/(.*?)\/index\.js$/u);
    const dir = match[1];
    const parsedModule = context(str);
    componentMap[dir] = parsedModule;
  });
  return componentMap;
};

const getComponets = (dir, componentKey, reducerKey) => {
  const componentMap = createComponentMap();
  if (!componentMap[dir]) {
    throw new Error(`domin/${dir}下不存在index.js`);
  }
  const Component = componentMap[dir][componentKey];
  const reducer = componentMap[dir][reducerKey];
  if (reducer) {
    store.injectReducer(reducer);
  }
  return Component;
};
// eslint-disable-next-line import/no-unused-modules
export default getComponets;
