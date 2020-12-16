import {
  createStore,
  applyMiddleware,
  compose,
  bindActionCreators,
} from 'redux';
import thunk from 'redux-thunk';
import { isObject } from 'better-utils';
import globalReducer from 'Src/app/reducer';
import rootReducer from './rootReducer';

class Store {
  constructor() {
    this.store = null;
    this.reducers = globalReducer;
  }

  saveStore2Local(store) {
    try {
      const serializedState = JSON.stringify(store.toJSON());
      localStorage.setItem(this.cacheKey, serializedState);
    } catch (jsonError) {
      console.error(jsonError);
    }
  }

  createStore() {
    this.store = createStore(
      rootReducer(this.reducers),
      {},
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
        applyMiddleware(thunk),
      ),
    );
    return this.store;
  }

  bindActions(creators) {
    if (this.store) {
      return bindActionCreators(creators, this.store.dispatch);
    }
    return null;
  }

  injectReducer(toInjectReducer) {
    const { store } = this;
    if (isObject(toInjectReducer)) {
      this.reducers = {
        ...this.reducers,
        ...toInjectReducer,
      };
      store.replaceReducer(rootReducer(this.reducers));
    } else {
      console.error('注入reducer需要是对象,属性是reducer的key');
    }
  }
}

export default new Store();
