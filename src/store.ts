import {Reducer, AnyAction,combineReducers} from 'redux';
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {CommonState, key as CommonKey} from './app/types';
import {TypedUseSelectorHook, useDispatch, useSelector,} from 'react-redux';
import commonReducer from './app/common-slice';

interface ReducerMap {
  [CommonKey]?: Reducer<CommonState, AnyAction>;
}

type NameSpaceKey = keyof  ReducerMap
let reducerMap: ReducerMap = {
  [CommonKey]: commonReducer,
};

const store = configureStore({
  reducer: reducerMap,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const injectReducer = (toInjectReducer: ReducerMap) => {
  reducerMap = {...reducerMap, ...toInjectReducer};
  store.replaceReducer(combineReducers(reducerMap));
};

export function selectByNameSpace<T extends NameSpaceKey>(
  state: RootState,
  namespace: T
): RootState[T] {
  const namespaceState = state[namespace];
  if (!namespaceState) {
    throw new Error(
      `Attempted to access state for an unregistered namespace at key ${namespace}`
    );
  }
  // We need to explicitly say this is not undefined because TypeScript doesn't 
  // recognize the thrown error will prevent us from ever getting here.
  return namespaceState;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;