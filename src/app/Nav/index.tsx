import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import urlAIncludeB from './urlAIncludeB';
import { MenuConfig } from '../router';

const { SubMenu, Item } = Menu;
const createMenu = (tree: MenuConfig, url: string, openMenus: string[]) => {
  if (tree.type === 'composite') {
    if (urlAIncludeB(url, tree.path)) {
      openMenus.push(tree.path);
    }
    return (
      <SubMenu key={tree.path}>
        {tree.child.map((e) => {
          return createMenu(e, url, openMenus);
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
const Nav = ({ trees }: { trees: MenuConfig[] }) => {
  const [openMenus, setOpenMenus] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
  const [content, setContent] = useState<(JSX.Element | null)[] | null>(null);
  const location = useLocation();
  useEffect(() => {
    const url = location.pathname;
    const openMenus: any[] = [];
    const content = trees.map((tree) => createMenu(tree, url, openMenus));
    setOpenMenus(openMenus);
    setContent(content);
    setSelectedKeys([url]);
  }, [location.pathname, trees]);
  return (
    <div style={{ backgroundColor: '#001529', color: 'white'}}>
      <div className='product-nav'>
        <Menu
          mode='inline'
          className='prdct-tree'
          selectedKeys={selectedKeys}
          openKeys={openMenus}
          onOpenChange={setOpenMenus}
          theme='dark'
        >
          {content}
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
