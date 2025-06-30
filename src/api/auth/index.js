import callApi from "../callApi";
import {
  startRequestGetMe,
  startRequestGetMeFail,
  startRequestGetMeSuccess,
  startRequestLogin,
  startRequestLoginFail,
  startRequestLoginSuccess,
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
  startRequestResetPasswordFail
} from "../../states/modules/auth";
import {
  getAdminToken,
  getClientToken
} from "utils/localStorage";

// login admin 
export const login = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `/admin/login`,
    actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
    variables: {
      username: data.username,
      password: data.password,
    },
    dispatch,
    getState,
    role: 'admin'
  })
}

// login user

export const loginUser = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `auth/login`,
    actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
    variables: {
      username: data.username,
      password: data.password,
    },
    dispatch,
    getState
  })
}

//  getMe admin
export const getMe = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `users/myInfo`,
    actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
    variables: {},
    dispatch,
    getState,
    role: 'admin'
  })
}

// getMe user
export const getMeUser = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `users/myInfo`,
    actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
    variables: {},
    dispatch,
    getState
  })
}

export const register = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `auth/register`,
    actionTypes: [startRequestRegister, startRequestRegisterSuccess, startRequestRegisterFail],
    variables: {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      username: data.username,
      dob: data.dob,
    },
    dispatch,
    getState,
  })
}

export const logOut = () => async (dispatch, getState) => {
  const token = getAdminToken();
  return callApi({
    method: 'post',
    apiPath: `admin/logout`,
    actionTypes: [startLogOut, startLogOutSuccess, startLogOutFail],
    variables: {
      token
    },
    dispatch,
    getState,
    role: 'admin'
  })
}


export const logOutUser = () => async (dispatch, getState) => {
  const token = getClientToken();
  
  return callApi({
    method: 'post',
    apiPath: `auth/logout`,
    actionTypes: [startLogOut, startLogOutSuccess, startLogOutFail],
    variables: {
      token
    },
    dispatch,
    getState
  })
}

export const uploadAvatar = (id, formData) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `users/avatar/${id}`,
    actionTypes: [startUpdateAvatar, startUpdateAvatarSuccess, startUpdateAvatarFail],
    variables: formData,
    dispatch,
    getState,
    isFormData: true,
  })
}

export const forgotPassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `auth/forgot-password`,
    actionTypes: [startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail],
    variables: {
      email: data.email,
    },
    dispatch,
    getState
  })
}

export const updatePassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `auth/reset-password`,
    actionTypes: [startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail],
    variables: {
      token: data.token,
      passwordNew: data.passwordNew,
      confirmNewPassword: data.confirmNewPassword,
    },
    dispatch,
    getState
  })
}