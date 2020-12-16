import { createAction } from 'redux-actions';
import { SET_CHANNEL } from './actionType';

export const setChannel = createAction(SET_CHANNEL, channel => {
  if (typeof channel === 'string' && channel.trim()) {
    return channel.trim();
  }
  return '';
});
