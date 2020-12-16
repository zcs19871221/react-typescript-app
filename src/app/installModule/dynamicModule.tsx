import Loadable from 'react-loadable';
import React from 'react';
import { Spin } from 'antd';
import store from 'Src/store';
import { isDev } from 'Src/settings';

const Loading = props => {
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
              {error.stack.split('\n').map((stackErr, index) => (
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
const dImport = (dir, componentKey, reducerKey) => {
  const timeout = 5 * 1000;
  const delay = 300;
  return Loadable({
    loader: () =>
      import(
        /* webpackChunkName: "chunk-[request]" */
        /* webpackPrefetch: true */
        'Dom/' + dir + '/index.js'
      ),
    timeout,
    delay,
    loading: Loading,
    render: (loadedModules, props) => {
      const Component = loadedModules[componentKey];
      const reducer = loadedModules[reducerKey];
      if (reducer) {
        store.injectReducer(reducer);
      }
      return <Component {...props} />;
    },
  });
};

export default dImport;
