import { ReducerMap as GlobalReducerMap } from './app/types';

export type FullState = GlobalReducerMap /* && XXReducerMap */;
export type NameSpaceKey = keyof FullState;
export type ReducerMap = Partial<
  {
    [k in NameSpaceKey]: FullState[k];
  }
>;
