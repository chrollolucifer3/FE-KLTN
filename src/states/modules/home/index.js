import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    value: 'Set value',
  },
  reducers: {
    setValue: (state, action) => ({
      ...state,
      value: action.payload
    })
  }
})

export const {
  setValue
} = homeSlice.actions

export default homeSlice.reducer;
