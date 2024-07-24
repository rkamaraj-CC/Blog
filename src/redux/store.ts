import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice';


export const store = configureStore({
    reducer: {
      userDetails: loginReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;