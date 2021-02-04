import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import urlAIncludeB from './urlAIncludeB';
import { MenuConfig } from '../router';

const { SubMenu, Item } = Menu;
const createMenu = (tree: MenuConfig, url: string, openMenus: string[]) => {
  if (tree.type === 'composite') {
    if (urlAIncludeB(tree.path, url)) {
      openMenus.push(url);
    }
    return (
      <SubMenu>
        {tree.child.map((e) => {
          return createMenu(e, url, openMenus);
        })}
      </SubMenu>
    );
  }
  return null;
};
const Nav = ({ trees }: { trees: MenuConfig[] }) => {
  const [openMenus, setOpenMenus] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
  const [content, setContent] = useState<(JSX.Element | undefined)[]>(null);
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
    <div style={{ backgroundColor: '#001529', color: 'white', width: '250px' }}>
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
