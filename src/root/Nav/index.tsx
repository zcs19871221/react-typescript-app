import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { History } from 'history';
import { Menu } from 'antd';
import urlAIncludeB from './urlAIncludeB';
import { Route } from '../router';

const { SubMenu, Item } = Menu;
class Nav extends React.PureComponent<
  { tree: Route[]; location: Location; history: History },
  {
    path: string;
    openMenus: string[];
    selectedKeys: string[];
    content: null | JSX.Element[];
  }
> {
  state = {
    content: null,
    path: '',
    openMenus: [],
    selectedKeys: [],
  };

  componentDidMount() {
    this.setNav(this.props.location.pathname);
    this.props.history.listen((location) => {
      if (this.state.path !== location.pathname) {
        this.setNav(location.pathname);
      }
    });
  }

  createMenu = (tree: Route, url: string, openMenus: string[]) => {
    if (tree.type === 'composite') {
      if (urlAIncludeB(tree.path, url)) {
        openMenus.push(url);
      }
      return (
        <SubMenu>
          {tree.child.map((e) => {
            return this.createMenu(e, url, openMenus);
          })}
        </SubMenu>
      );
    }
    return (
      <Item key={tree.path}>
        <NavLink to={tree.path}>{tree.name}</NavLink>
      </Item>
    );
  };

  handleTroggleMenu = (openKeys: any[]) => {
    this.setState({
      openMenus: openKeys,
    });
  };

  private setNav(url: string) {
    const openMenus: string[] = [];
    const content = this.props.tree.map((tree) =>
      this.createMenu(tree, url, openMenus),
    );
    this.setState({
      openMenus,
      path: url,
      selectedKeys: [url],
      content,
    });
  }

  render() {
    return (
      <div
        style={{ backgroundColor: '#001529', color: 'white', width: '250px' }}
      >
        <div className='product-nav'>
          <Menu
            mode='inline'
            className='prdct-tree'
            selectedKeys={this.state.selectedKeys}
            openKeys={this.state.openMenus}
            onOpenChange={this.handleTroggleMenu}
            theme='dark'
          >
            {this.state.content}
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter((props: any) => <Nav {...props} />);
