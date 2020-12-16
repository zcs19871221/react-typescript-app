import { Action, SET_USER_ID, SET_USER_NAME } from './types';

export const setUserName = (userName: string): Action => {
  return {
    type: SET_USER_NAME,
    payload: userName,
  };
};

export const setUserId = (userId: string): Action => {
  return {
    type: SET_USER_ID,
    payload: userId,
  };
};
