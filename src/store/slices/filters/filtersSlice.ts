import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Filters } from '@/types/filters';

export type RangeFilter = 'low' | 'medium' | 'high' | 'extraHigh';

interface FilterState {
  category: string | null;
  timeRange: RangeFilter | null;
  price: RangeFilter | null;
  filterOptions: Filters[] | null;
  priceFilterLookup: Record<string, string | null> | null;
}

const initialState: FilterState = {
  category: null,
  timeRange: null,
  price: null,
  filterOptions: null,
  priceFilterLookup: null,
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
    setFilterOptions: (state, action: PayloadAction<FilterState['filterOptions']>) => {
      state.filterOptions = action.payload;
    },
    addPriceLookup: (state, action: PayloadAction<FilterState['priceFilterLookup']>) => {
      state.priceFilterLookup = { ...state.priceFilterLookup, ...action.payload };
    },
  },
});

export const { setCategory, setTimeRange, setPrice, setFilterOptions } = filtersSlice.actions;
export default filtersSlice.reducer;
