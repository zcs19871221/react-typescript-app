import {
  State,
  Action,
  SET_USER_NAME,
  SET_USER_ID,
  Key,
  Reducer,
  ReducerMap,
} from './types';

const initialState: State = {
  userName: '张成思',
  userId: '',
};

const globalReducer: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        userId: action.payload,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};
const reducerMap: ReducerMap = {
  [Key]: globalReducer,
};
export default reducerMap;
export const getGlobal = (state: any): State => {
  return state[Key];
};
export const getUserName = (state: any) => {
  return getGlobal(state).userName;
};
export const getUserId = (state: any) => {
  return getGlobal(state).userId;
};
