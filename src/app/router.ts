interface BaseRoute {
  path: string;
  name: string;
}

interface Composite extends BaseRoute {
  child: MenuConfig[];
  type: 'composite';
}

interface Leaf extends BaseRoute {
  dir: string;
  type: 'leaf';
}

type MenuConfig = Composite | Leaf;
type RouteConfig = [string, string];
export type { MenuConfig, Leaf, RouteConfig };

export default class Router {
  private dirUrls: RouteConfig[] = [];
  private dirs: string[] = [];
  private urls: string[] = [];
  private usedDirs: string[] | string = [];
  constructor(
    private readonly routes: MenuConfig[],
    private readonly base: string = '/',
  ) {}

  private buildLeaf(r: Leaf, url: string): MenuConfig[] {
    const dir = r.dir;
    if (this.dirs.includes(dir)) {
      throw new Error(`dir不唯一:${dir}}`);
    }
    this.dirs.push(dir);
    if (this.usedDirs === 'all' || this.usedDirs.includes(dir)) {
      this.dirUrls.push([dir, url]);
      return [{ ...r, path: url }];
    }
    return [];
  }

  private buildComposite(r: Composite, url: string): MenuConfig[] {
    const child = this.buildRoute(r.child, url);
    if (child.length === 0) {
      return [];
    }
    return [{ ...r, path: url, child }];
  }

  private buildRoute(routes: MenuConfig[], base: string): MenuConfig[] {
    return routes.reduce((acc: MenuConfig[], r) => {
      const url = `${base}/${r.path}`.replace(/\/+/gu, '/');
      if (this.urls.includes(url)) {
        throw new Error(`重复url:${url} path:${r.path}`);
      }
      this.urls.push(url);
      let routes = [];
      switch (r.type) {
        case 'leaf':
          routes = this.buildLeaf(r, url);
          break;
        case 'composite':
          routes = this.buildComposite(r, url);
          break;
        default:
          throw new Error('Unexpected type: ');
      }
      acc.push(...routes);
      return acc;
    }, []);
  }

  build(): [RouteConfig[], MenuConfig[]] {
    this.dirUrls = [];
    this.dirs = [];
    this.urls = [];
    return [this.dirUrls, this.buildRoute(this.routes, this.base)];
  }

  setUsedDirs(dirs: string[] | 'all') {
    this.usedDirs = dirs;
  }
}
