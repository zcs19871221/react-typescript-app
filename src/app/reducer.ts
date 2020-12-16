import { handleActions } from 'redux-actions';
import { SET_CHANNEL } from './actionType';

const Id = 'global';

const defaultState = {};

const setChannel = (state, { payload: channel }) => {
  return {
    ...state,
    channel,
  };
};

export default {
  [Id]: handleActions(
    {
      [SET_CHANNEL]: setChannel,
    },
    defaultState,
  ),
};

export const getGlobal = state => {
  return state[Id];
};
export const getChannel = state => {
  return getGlobal(state).channel;
};
