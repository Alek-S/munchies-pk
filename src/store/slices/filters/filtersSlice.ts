import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type RangeFilter = 'low' | 'medium' | 'high' | 'extraHigh';

interface FilterState {
  category: string | null;
  timeRange: RangeFilter | null;
  price: RangeFilter | null;
}

const initialState: FilterState = {
  category: null,
  timeRange: null,
  price: null,
};

export const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<FilterState['category']>) => {
      state.category = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<FilterState['timeRange']>) => {
      state.timeRange = action.payload;
    },
    setPrice: (state, action: PayloadAction<FilterState['price']>) => {
      state.price = action.payload;
    },
  },
});

export const { setCategory, setTimeRange, setPrice } = filtersSlice.actions;
export default filtersSlice.reducer;
