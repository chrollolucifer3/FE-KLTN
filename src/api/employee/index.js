import callApi from "../callApi";
import {
  getList, getListSuccess, getListFail,
  // getAllRole, getAllRoleSuccess, getAllRoleFail,
  createEmployee, createEmployeeSuccess, createEmployeeFail,
  updateEmployee, updateEmployeeSuccess, updateEmployeeFail,
  deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFail,
  getFollowing, getFollowingSuccess, getFollowingFail,
  unFollowUser, unFollowUserSuccess, unFollowUserFail,
   getUserInCurrentMonth, getUserInCurrentMonthSuccess, getUserInCurrentMonthFail,
   getListAuthor, getListAuthorSuccess, getListAuthorFail,
   unBlockEmployee, unBlockEmployeeSuccess, unBlockEmployeeFail,
   getAuthorDetail, getAuthorDetailSuccess, getAuthorDetailFail
} from "../../states/modules/employee";

export const getListEmployee = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
  let path = `users/getAll?size=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&search=${dataFilter.keySearch}`;
  }

  if (dataFilter.isActive !== undefined && dataFilter.isActive !== "") {
    path += `&isActive=${dataFilter.isActive}`;
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getList, getListSuccess, getListFail],
    variables: {},
    dispatch,
    getState,
    role: 'admin'
  });
};


// export const getAllRoleForEmployee = () => async (dispatch, getState) => {
//   return callApi({
//     method: 'get',
//     apiPath: `users/all-roles`,
//     actionTypes: [getAllRole, getAllRoleSuccess, getAllRoleFail],
//     variables: {},
//     dispatch,
//     getState
//   })
// }

export const handleCreateEmployee = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `users`,
    actionTypes: [createEmployee, createEmployeeSuccess, createEmployeeFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateEmployee = (data, idEmployee) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `users/${idEmployee}`,
    actionTypes: [updateEmployee, updateEmployeeSuccess, updateEmployeeFail],
    variables: data,
    dispatch,
    getState,
    role: 'admin' // thêm role là 'admin'
  })
}

export const handleDeleteEmployee = (idEmployee) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `users/block/${idEmployee}`,
    actionTypes: [deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFail],
    variables: {},
    dispatch,
    getState,
    role: 'admin' // thêm role là 'admin'
  })
}

export const getCountUserInCurrentMonth = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `users/newUsersCount`,
    actionTypes: [ getUserInCurrentMonth, getUserInCurrentMonthSuccess, getUserInCurrentMonthFail],
    variables: {},
    dispatch,
    getState,
    role: 'admin' // thêm role là 'admin'
  })
}

export const followUser = (idUser) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `users/follow/${idUser}`,
    actionTypes: [getFollowing, getFollowingSuccess, getFollowingFail,],
    variables: {},
    dispatch,
    getState,
    role: 'client' // thêm role là 'client'
  })
}

export const unfollowAuthor = (idUser) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `users/unfollow/${idUser}`,
    actionTypes: [unFollowUser, unFollowUserSuccess, unFollowUserFail],
    variables: {},
    dispatch,
    getState,
    role: 'client' 
  })
}

export const getListAuthorFollow = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
  let path = `users/following?size=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&search=${dataFilter.keySearch}`;
  }

  if (dataFilter.order && dataFilter.column) {
    path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListAuthor, getListAuthorSuccess, getListAuthorFail],
    variables: {},
    dispatch,
    getState,
    role: 'client' // thêm role là 'client'
  })
}

export const unBlock = (idEmployee) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `users/unblock/${idEmployee}`,
    actionTypes: [unBlockEmployee, unBlockEmployeeSuccess, unBlockEmployeeFail],
    variables: {},
    dispatch,
    getState,
    role: 'admin' // thêm role là 'admin'
  })
}

export const getAuthorDetailForClient = (idAuthor) => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `users/author/${idAuthor}`,
    actionTypes: [getAuthorDetail, getAuthorDetailSuccess, getAuthorDetailFail],
    variables: {},
    dispatch,
    getState,
    role: 'client' // thêm role là 'client'
  })
}