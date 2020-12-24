import Loadable from 'react-loadable';
import React from 'react';
import { Spin } from 'antd';
import store from '../../store';
import { isDev } from '../../settings';

const Loading = (props: any) => {
  const { error, retry, timedOut } = props;
  if (error) {
    if (isDev) {
      throw new Error(props.error.stack);
    } else {
      return (
        <div>
          <div>
            <div>发现错误：</div>
            <div>
              {error.stack.split('\n').map((stackErr: any, index: number) => (
                <div
                  key={`${stackErr + index}`}
                  style={{
                    marginLeft: index > 0 ? '3em' : 0,
                  }}
                >
                  {stackErr}
                </div>
              ))}
            </div>
          </div>
          <button type='button' onClick={retry}>
            重试
          </button>
        </div>
      );
    }
  } else if (timedOut) {
    return (
      <div>
        加载超时...{' '}
        <button type='button' onClick={retry}>
          重试
        </button>
      </div>
    );
  } else if (props.pastDelay) {
    return <Spin size='large' />;
  } else {
    return null;
  }
};

/* eslint-disable no-inline-comments,prefer-template */
const dImport = (dir: string) => {
  const timeout = 5 * 1000;
  const delay = 300;
  return Loadable({
    loader: () =>
      import(
        /* webpackChunkName: "chunk-[request]" */
        'Dom/' + dir + '/index.ts'
      ),
    timeout,
    delay,
    loading: Loading,
    render: (loadedModules, props) => {
      const Component = loadedModules.router;
      const reducer = loadedModules.reducer;
      if (reducer) {
        store.injectReducer(reducer);
      }
      return <Component {...props} />;
    },
  });
};

export default dImport;
