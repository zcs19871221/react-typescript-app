import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import globalReducer from './app/reducer';
import { ReducerMap } from './types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

class ReduxStore {
  private store: Store;
  private reducers: ReducerMap = { ...globalReducer };
  constructor() {
    this.store = createStore(
      this.createReducer(),
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
        applyMiddleware(thunk),
      ),
    );
  }

  private createReducer() {
    return combineReducers(this.reducers);
  }

  get() {
    return this.store;
  }

  injectReducer(toInjectReducer: ReducerMap) {
    const { store } = this;
    this.reducers = {
      ...this.reducers,
      ...toInjectReducer,
    };
    store.replaceReducer(this.createReducer());
  }
}

export default new ReduxStore();
