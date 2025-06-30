import { createSlice } from "@reduxjs/toolkit";

const homeClientSlice = createSlice({
  name: 'home client',
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
} = homeClientSlice.actions

export default homeClientSlice.reducer;
