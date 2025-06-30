import {
  createSlice
} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthSuccess: false,
    authUser: {},
    loginError: {
      email: '',
      password: '',
    },
    errorRegister: {
      fullName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
    },
    forgotPasswordError: {
      email: '',
    },
    isLoadingBtnLogin: false,
    isLoadingBtnRegister: false
  },
  reducers: {
    setErrorDataForgotPassword: (state, action) => {
      state.forgotPasswordError = action.payload;
    },
    setErrorRegister: (state, action) => {
      state.errorRegister = action.payload;
    },
    startRequestLogin: (state) => ({
      ...state,
      isLoadingBtnLogin: true
    }),
    setErrorLogin: (state, action) => {
      state.loginError = action.payload;
    },
    startRequestLoginSuccess: (state) => ({ // Kiểm tra xem action có vào reducer không
      ...state,
      isLoadingBtnLogin: false,
    }),
    startRequestLoginFail: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startLogOut: (state) => ({
      ...state,
    }),
    startLogOutSuccess: (state) => ({
      ...state,
      isAuthSuccess: false,
      authUser: {}
    }),
    startLogOutFail: (state) => ({
      ...state,
    }),
    startRequestGetMe: (state) => ({
      ...state,
    }),
    startRequestGetMeSuccess: (state, action) => ({
      ...state,
      isAuthSuccess: true,
      authUser: action.payload.result
    }),
    startRequestGetMeFail: (state) => ({
      ...state,
      isAuthSuccess: false,
      authUser: {}
    }),
    startRequestRegister: (state) => ({
      ...state,
      isLoadingBtnRegister: true
    }),
    startRequestRegisterSuccess: (state) => ({
      ...state,
      isLoadingBtnRegister: false
    }),
    startRequestRegisterFail: (state) => ({
      ...state,
      isLoadingBtnRegister: false
    }),
    startUpdateAvatar: (state) => ({
      ...state,
    }),
    startUpdateAvatarSuccess: (state) => ({
      ...state,
    }),
    startUpdateAvatarFail: (state) => ({
      ...state,
    }),
    startRequestForgotPassword: (state) => ({
      ...state,
    }),
    startRequestForgotPasswordSuccess: (state) => ({
      ...state,
    }),
    startRequestForgotPasswordFail: (state) => ({
      ...state,
    }),
    startRequestResetPassword: (state) => ({
      ...state,
    }),
    startRequestResetPasswordSuccess: (state) => ({
      ...state,
    }),
    startRequestResetPasswordFail: (state) => ({
      ...state,
    }),
  }
})

export const {
  startRequestLogin,
  startRequestLoginSuccess,
  startRequestLoginFail,
  startRequestGetMe,
  startRequestGetMeSuccess,
  startRequestGetMeFail,
  startRequestRegister,
  startRequestRegisterSuccess,
  startRequestRegisterFail,
  startLogOut,
  startLogOutSuccess,
  startLogOutFail,
  startUpdateAvatar,
  startUpdateAvatarSuccess,
  startUpdateAvatarFail,
  startRequestForgotPassword,
  startRequestForgotPasswordSuccess,
  startRequestForgotPasswordFail,
  startRequestResetPassword,
  startRequestResetPasswordSuccess,
  startRequestResetPasswordFail,
  setErrorLogin, 
  setErrorRegister,
  setErrorDataForgotPassword
} = authSlice.actions

export default authSlice.reducer;