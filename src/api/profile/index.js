import callApi from "../callApi";
import {
  changePassword, changePasswordFail, changePasswordSuccess,
  updateInfoUser, updateInfoUserFail, updateInfoUserSuccess
} from "../../states/modules/profile";

export const handleUpdateInfoUser = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `update-self`,
    actionTypes: [updateInfoUser, updateInfoUserSuccess, updateInfoUserFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleChangePassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `change-password`,
    actionTypes: [changePassword, changePasswordSuccess, changePasswordFail],
    variables: data,
    dispatch,
    getState
  })
}
