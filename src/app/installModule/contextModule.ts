import store from '../../store';

const createComponentMap = () => {
  const context = (require as any).context('Dom/', true, /index\.js$/u);
  const componentMap: { [key: string]: any } = {};
  context.keys().forEach((str: string) => {
    const match = str.match(/^\.\/(.*?)\/index\.js$/u);
    if (match && match[1]) {
      const dir = match[1];
      const parsedModule = context(str);
      componentMap[dir] = parsedModule;
    } else {
      throw new Error('不存在key：' + str);
    }
  });
  return componentMap;
};

const getComponets = (dir: string) => {
  const componentMap = createComponentMap();
  if (!componentMap[dir]) {
    throw new Error(`domin/${dir}下不存在index.js`);
  }
  const Component = componentMap[dir].router;
  const reducer = componentMap[dir].reducer;
  if (reducer) {
    store.injectReducer(reducer);
  }
  return Component;
};
export default getComponets;
