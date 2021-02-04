import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import installModule from './installModule';
import NotFound from './NotFound';
import Nav from './Nav';
import Header from './header';
import Router, { MenuConfig, RouteConfig } from './router';
import { fullTree, base } from './tree';
import style from './index.module.less';
import { appName } from '../settings';
import 'antd/dist/antd.css';

const Root = () => {
  const [config, setConfig] = useState<{
    routes: RouteConfig[];
    menus: MenuConfig[];
  }>({
    routes: [],
    menus: [],
  });
  useEffect(() => {
    const router = new Router(fullTree, base);
    router.setUsedDirs('all');
    const [routes, menus] = router.build();
    setConfig({ routes, menus });
  }, []);
  return (
    <BrowserRouter>
      <div className={style.wrapper}>
        <Header userName='张成思' appName={appName} />
        <div className={style.wholeWrap}>
          <Nav tree={config.menus} />
          <div className={style.wrap}>
            <Switch>
              {config.routes.map(([dir, path]) => (
                <Route
                  exact={path === '/'}
                  path={path}
                  component={installModule(dir)}
                  key={dir}
                />
              ))}
              <Route component={NotFound} path='*' />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Root;
