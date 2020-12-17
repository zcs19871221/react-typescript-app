import { ReducerMap as GlobalReducerMap } from './root/types';

export type FullState = GlobalReducerMap /* && XXReducerMap */;
export type NameSpaceKey = keyof FullState;
export type ReducerMap = Partial<
  {
    [k in NameSpaceKey]: FullState[k];
  }
>;
