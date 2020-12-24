import React from 'react';
import { Route, Switch } from 'react-router-dom';
import installModule from '../installModule';
import NotFound from './NotFound';
import style from './index.module.less';
import Nav from '../Nav';
import Router from '../router';

export default class Content extends React.PureComponent<{ router: Router }> {
  render() {
    const { router } = this.props;
    const routes = router.build();
    if (routes.length === 0) {
      return null;
    }
    return (
      <div className={style.wholeWrap}>
        <Nav tree={routes} />
        <div className={style.wrap}>
          {
            <Switch>
              {routes
                .map((route) => {
                  if (route.type === 'leaf') {
                    return (
                      <Route
                        exact={route.path === '/'}
                        path={route.path}
                        component={installModule(route.dir)}
                        key={route.dir}
                      />
                    );
                  }
                  return null;
                })
                .filter(Boolean)}
              <Route component={NotFound} path='*' />
            </Switch>
          }
        </div>
      </div>
    );
  }
}
