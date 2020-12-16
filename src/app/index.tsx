import React, { PureComponent } from 'react';
import { shape } from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import Content from './content';
import Header from './header';
import Router from './router';
import style from './index.module.scss';
import 'antd/dist/antd.css';

class App extends PureComponent {
  static propTypes = {
    store: shape({
      // redux store
    }).isRequired,
  };

  router: Router = new Router([]);

  state = {
    navs: [],
    routes: {},
  };

  async componentDidMount() {
    this.router.setUsedDirs('all');
  }

  render() {
    return (
      <BrowserRouter>
        <div className={style.wrapper}>
          <Header userName='张成思' />
          <Content router={this.router} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
