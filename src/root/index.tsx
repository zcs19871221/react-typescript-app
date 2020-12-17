import React, { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './content';
import Header from './header';
import Router from './router';
import style from './index.module.less';
import { appName } from '../settings';
import 'antd/dist/antd.css';

export default class Root extends PureComponent {
  router: Router = new Router([]);

  async componentDidMount() {
    this.router.setUsedDirs('all');
  }

  render() {
    return (
      <BrowserRouter>
        <div className={style.wrapper}>
          <Header userName='张成思' appName={appName} />
          <Content router={this.router} />
        </div>
      </BrowserRouter>
    );
  }
}
