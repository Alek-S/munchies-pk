import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  helloWorld: boolean
}

const initialState: FilterState = {
  helloWorld: true,
}

export const filtersSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<boolean>) => {
      state.helloWorld = action.payload
    },
  },
})

export const { setValue } = filtersSlice.actions
export default filtersSlice.reducer
