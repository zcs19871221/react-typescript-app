import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer, {CounterState} from '../features/counter/counterSlice';
import { Reducer, AnyAction, combineReducers, Store, createStore } from 'redux';

import CommonReducer,{CommonState} from './common-slice';


interface ReducerMap {
  common?: Reducer<CommonState, AnyAction>;
}
const reducerMap: ReducerMap = {};

export const store = configureStore({
  reducer: reducerMap,
});
store.replaceReducer(combineReducers(reducerMap))

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
