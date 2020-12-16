import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { shape, string, array, arrayOf } from 'prop-types';
import { Menu } from 'antd';
import DraggerBlock from 'Com/DraggerBlock';
import urlAIncludeB from './urlAIncludeB';
import { Route } from '../router';

const { SubMenu, Item } = Menu;
class Nav extends React.PureComponent<{ tree: Route; location: Location }> {
  static createMenu = (tree: Route, tmp) => {
    const { name, url, child } = tree;
    if (child && child.length > 0) {
      if (urlAIncludeB(tmp.curUrl, url)) {
        tmp.openMenus.push(url);
      }
      return (
        <SubMenu title={name} key={url}>
          {child.map((each) => Nav.createMenu(each, tmp))}
        </SubMenu>
      );
    }
    if (tmp.curUrl === url) {
      tmp.selectedKey = url;
    }
    return (
      <Item key={url}>
        <NavLink to={url}>{name}</NavLink>
      </Item>
    );
  };

  static getDerivedStateFromProps(props, state) {
    const { url } = state;
    const location: Location = props.location;
    const tree: Route[] = props.tree;
    if (location.pathname !== url) {
      const tmp = {
        openMenus: [],
        selectedKey: '',
        curUrl: pathname,
      };
      const content = tree.map((each) => Nav.createMenu(each, tmp));
      return {
        url: pathname,
        content,
        openMenus: tmp.openMenus,
        selectedKey: tmp.selectedKey,
      };
    }
    return null;
  }

  static propTypes = {
    tree: arrayOf(
      shape({
        url: string,
        child: array,
        name: string,
      }),
    ).isRequired,
    location: shape({
      // router location
    }).isRequired,
  };

  state = {
    openMenus: [],
    url: '',
    selectedKey: '',
    content: null,
  };

  handleTroggleMenu = (openKeys) => {
    this.setState({
      openMenus: openKeys,
    });
  };

  handleSelectMenu = ({ selectedKeys }) => {
    this.setState({ selectedKey: selectedKeys });
  };

  render() {
    const { selectedKey, openMenus, content } = this.state;
    return (
      <div style={{ backgroundColor: '#001529', color: 'white' }}>
        <DraggerBlock>
          <div className='product-nav'>
            <Menu
              mode='inline'
              className='prdct-tree'
              selectedKeys={selectedKey}
              openKeys={openMenus}
              onOpenChange={this.handleTroggleMenu}
              theme='dark'
            >
              {content}
            </Menu>
          </div>
        </DraggerBlock>
      </div>
    );
  }
}

export default withRouter((props) => <Nav {...props} />);
