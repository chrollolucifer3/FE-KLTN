import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    title: ''
  },
  reducers: {
    setTitle: (state) => ({
      ...state,
      title: 'title'
    })
  }
})

export const {
  setTitle
} = aboutSlice.actions

export default aboutSlice.reducer;
