import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category: string | null;
}

const initialState: FilterState = {
  category: null,
};

export const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<FilterState['category']>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = filtersSlice.actions;
export default filtersSlice.reducer;
