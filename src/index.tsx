/// <reference path="./react-app-env.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';

(function main() {
  try {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store.get()}>
          <Root />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root'),
      () => {
        console.log('render 结束');
      },
    );
    reportWebVitals(console.log);
  } catch (renderError) {
    console.log(renderError);
  }
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
