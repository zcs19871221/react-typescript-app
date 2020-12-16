import { Reducer as ReduxReducer } from 'redux';
export const Key = 'global';
export const SET_USER_NAME = `${Key}/setUserName`;
export const SET_USER_ID = `${Key}/setUserId`;

interface SetUserName {
  type: typeof SET_USER_NAME;
  payload: string;
}

interface SetUserId {
  type: typeof SET_USER_ID;
  payload: string;
}

export type Action = SetUserName | SetUserId;

export interface State {
  userName: string;
  userId: string;
}

export type Reducer = ReduxReducer<State, Action>;

export interface ReducerMap {
  [Key]: Reducer;
}
