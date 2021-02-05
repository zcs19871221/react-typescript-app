import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import installModule from './installModule';
import NotFound from './NotFound';
import Nav from './Nav';
import HeaderContent from './header';
import Router, { MenuConfig, RouteConfig } from './router';
import { fullTree, base } from './tree';
import style from './index.module.less';
import { appName } from '../settings';
import 'antd/dist/antd.css';

const { Header, Content, Sider } = Layout;

const Root = () => {
  const [config, setConfig] = useState<{
    routes: RouteConfig[];
    menus: MenuConfig[];
  }>({
    routes: [],
    menus: [],
  });
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const router = new Router(fullTree, base);
    router.setUsedDirs('all');
    const [routes, menus] = router.build();
    setConfig({ routes, menus });
  }, []);
  return (
    <BrowserRouter>
      <Layout className={style.wrapper}>
        <Header>
          <HeaderContent userName='张成思' appName={appName} />
        </Header>
        <Layout className={style.wholeWrap}>
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <Nav trees={config.menus} />
          </Sider>
          <Content className={style.wrap}>
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
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default Root;
