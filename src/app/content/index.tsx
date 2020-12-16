import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import installModule from '../installModule';
import NotFound from './NotFound';
import style from './index.module.scss';
import Nav from '../Nav';
import Router from '../router';

class Content extends React.PureComponent<{ router: Router }> {
  render() {
    const { router } = this.props;
    const routes = router.build();
    if (routes.length === 0) {
      return null;
    }
    return (
      <div className={style.wholeWrap}>
        {navs.length > 0 && <Nav tree={navs} />}
        <div className={style.wrap}>
          {Object.keys(routes).length > 0 && (
            <Switch>
              <Route exact path='/'>
                <Redirect to='/contentMonitor/monitWeiBo' />
              </Route>
              <Route exact path='/contentMonitor/index.html'>
                <Redirect to='/contentMonitor/monitWeiBo' />
              </Route>
              {Object.entries(routes).map(
                ([key, { url, dir = key, componentKey, reducerKey }]) => {
                  return (
                    <Route
                      exact={url === '/'}
                      path={url}
                      component={installModule(dir, componentKey, reducerKey)}
                      key={key}
                    />
                  );
                },
              )}
              <Route component={NotFound} path='*' />
            </Switch>
          )}
        </div>
      </div>
    );
  }
}
export default Content;
