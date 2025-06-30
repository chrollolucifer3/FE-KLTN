import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    author: [],
    authorDetail: {},
    isLoadingListAuthor: false,
    paginationListAuthor: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    isLoadingTableEmployee: false,
    paginationListEmployee: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    userInCurrentMonth: 0,
    visibleModalCreateOrUpdateEmployee: false,
    isLoadingBtnCreateOrUpdateEmployee: false,
    errorCreateOrUpdateEmployee: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    visibleModalDeleteEmployee: false,
    isLoadingBtnDeleteEmployee: false,
    visibleModalUnBlockEmployee: false,
    isLoadingBtnUnBlockEmployee: false,
  },
  reducers: {
    setErrorCreateOrUpdateEmployee: (state, action) => ({
      ...state,
      errorCreateOrUpdateEmployee: action.payload
    }),
    setVisibleModalCreateOrUpdateEmployee: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateEmployee: action.payload
    }),
    setVisibleModalDeleteEmployee: (state, action) => ({
      ...state,
      visibleModalDeleteEmployee: action.payload
    }),
    setVisibleModalUnBlockEmployee: (state, action) => ({
      ...state,
      visibleModalUnBlockEmployee: action.payload
    }),
    getList: (state) => ({
      ...state,
      employees: [],
      isLoadingTableEmployee: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableEmployee: false,
      employees: action.payload.result.users,
      paginationListEmployee: {
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      employees: [],
      isLoadingTableEmployee: false
    }),
    getListAuthor: (state) => ({
      ...state,   
        author: [],
        isLoadingListAuthor: true
    }),
    getListAuthorSuccess: (state, action) => ({
      ...state,
      isLoadingListAuthor: false,
      author: action.payload.result.users,
      paginationListAuthor: {
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
    }),
    getListAuthorFail: (state) => ({
      ...state,   
      isLoadingListAuthor: false, 
    }),
    createEmployee: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: true
    }),
    createEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    createEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    updateEmployee: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: true
    }),
    updateEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    updateEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    deleteEmployee: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: true
    }),
    deleteEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: false
    }),
    deleteEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: false
    }),
    unBlockEmployee : (state) => ({
      ...state,
      isLoadingBtnUnBlockEmployee: true
    }),
    unBlockEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnUnBlockEmployee: false
    }),
    unBlockEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnUnBlockEmployee: false
    }),
    getUserInCurrentMonth: (state) => ({
      ...state,
      userInCurrentMonth: 0
    }),
    getUserInCurrentMonthSuccess: (state, action) => ({
      ...state,
      userInCurrentMonth: action.payload.result
    }),
    getUserInCurrentMonthFail: (state) => ({
      ...state,
      userInCurrentMonth: 0
    }),
    getFollowing: (state) => ({
      ...state,
    }),
    getFollowingSuccess: (state) => ({
      ...state,
    }),
    getFollowingFail: (state) => ({
      ...state,
    }),
    unFollowUser: (state) => ({
      ...state,
    }),
    unFollowUserSuccess: (state) => ({
      ...state,
    }),
    unFollowUserFail: (state) => ({
      ...state,
    }),
    getAuthorDetail: (state) => ({
      ...state,
      authorDetail: {},
    }),
    getAuthorDetailSuccess: (state, action) => ({
      ...state,
      authorDetail: action.payload.result,
    }),
    getAuthorDetailFail: (state) => ({
      ...state,
      authorDetail: {},
    }),
  }
})

export const {
  setErrorCreateOrUpdateEmployee,
  setVisibleModalDeleteEmployee,
  setVisibleModalCreateOrUpdateEmployee,
  getList, getListSuccess, getListFail,
  createEmployee, createEmployeeSuccess, createEmployeeFail,
  updateEmployee, updateEmployeeSuccess, updateEmployeeFail,
  deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFail,
  getUserInCurrentMonth, getUserInCurrentMonthSuccess, getUserInCurrentMonthFail,
  getFollowing, getFollowingSuccess, getFollowingFail,
  unFollowUser, unFollowUserSuccess, unFollowUserFail,
  getListAuthor, getListAuthorSuccess, getListAuthorFail,
  setVisibleModalUnBlockEmployee,
  unBlockEmployee, unBlockEmployeeSuccess, unBlockEmployeeFail,
  getAuthorDetail, getAuthorDetailSuccess, getAuthorDetailFail
} = employeeSlice.actions

export default employeeSlice.reducer;
