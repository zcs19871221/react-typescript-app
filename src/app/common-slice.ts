import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { fetchCount } from './counterAPI';

export const key = 'common';
export interface CommonState  {
  userName: string,
  userId: string,
}

const initialState: CommonState = {
  userName: '张成思',
  userId: '0001',
};

export const commonSlice = createSlice({
  name: key,
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userName = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setName, setUserId} = commonSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserName = (state: RootState) => state.common;


export default commonSlice.reducer;
