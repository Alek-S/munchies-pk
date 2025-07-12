import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '@/store/slices/filters/filtersSlice';

/** Redux store, for use by provider */
export const store = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
