import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    errorInfoUser: {
      name: '',
      email: '',
      phone: ''
    },
    loadingBtnUpdateInfoUser: false,
    errorChangePassword: {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    loadingBtnChangePassword: false,
  },
  reducers: {
    setErrorInfoUser: (state, action) => ({
      ...state,
      errorInfoUser: action.payload
    }),
    setErrorChangePassword: (state, action) => ({
      ...state,
      errorChangePassword: action.payload
    }),
    updateInfoUser: (state) => ({
      ...state,
      loadingBtnUpdateInfoUser: true
    }),
    updateInfoUserSuccess: (state) => ({
      ...state,
      loadingBtnUpdateInfoUser: false
    }),
    updateInfoUserFail: (state) => ({
      ...state,
      loadingBtnUpdateInfoUser: false
    }),
    changePassword: (state) => ({
      ...state,
      loadingBtnChangePassword: true
    }),
    changePasswordSuccess: (state) => ({
      ...state,
      loadingBtnChangePassword: false
    }),
    changePasswordFail: (state) => ({
      ...state,
      loadingBtnChangePassword: false
    }),
  }
})

export const {
  setErrorInfoUser,
  setErrorChangePassword,
  updateInfoUser, updateInfoUserSuccess, updateInfoUserFail,
  changePassword, changePasswordSuccess, changePasswordFail,
} = profileSlice.actions

export default profileSlice.reducer;
