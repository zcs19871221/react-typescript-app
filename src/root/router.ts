interface BaseRoute {
  path: string;
  name: string;
}

interface Composite extends BaseRoute {
  child: Route[];
  type: 'composite';
}

interface Leaf extends BaseRoute {
  dir: string;
  type: 'leaf';
}

type Route = Composite | Leaf;
export type { Route, Leaf };
export default class Router {
  private dirMapUrl: Map<string, string> = new Map();
  private dirs: string[] = [];
  private urls: string[] = [];
  private usedDirs: string[] | string = [];
  constructor(
    private readonly routes: Route[],
    private readonly base: string = '/',
  ) {}

  private buildLeaf(r: Leaf, url: string): Route[] {
    const dir = r.dir;
    if (this.dirs.includes(dir)) {
      throw new Error(`dir不唯一:${dir}}`);
    }
    this.dirs.push(dir);
    if (this.usedDirs === 'all' || this.usedDirs.includes(dir)) {
      this.dirMapUrl.set(dir, url);
      return [{ ...r, path: url }];
    }
    return [];
  }

  private buildComposite(r: Composite, url: string): Route[] {
    const child = this.buildRoute(r.child, url);
    if (child.length === 0) {
      return [];
    }
    return [{ ...r, path: url, child }];
  }

  private buildRoute(routes: Route[], base: string): Route[] {
    return routes.reduce((acc: Route[], r) => {
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

  build() {
    this.dirMapUrl = new Map();
    this.dirs = [];
    this.urls = [];
    return this.buildRoute(this.routes, this.base);
  }

  setUsedDirs(dirs: string[] | 'all') {
    this.usedDirs = dirs;
  }
}
