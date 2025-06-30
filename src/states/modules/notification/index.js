import {
  createSlice
} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    countNoti: 0,
    isLoadingListNotification: false,
    paginationListNotification: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
  },
  reducers: {
    getListNotification: (state) => ({
      ...state,
        isLoadingListNotification: true,
    }),
    getListNotificationSuccess: (state, action) => ({
      ...state,
      isLoadingListNotification: false,
      notifications: action.payload.result.notifications,
      paginationListNotification: {
        currentPage: action.payload.result.page,
        perPage: action.payload.result.size,
        totalPage: action.payload.result.totalPages,
        totalRecord: action.payload.result.total,
      },
    }),
    getListNotificationFail: (state) => ({
      ...state,
      isLoadingListNotification: false,
    }),
    getCountNotification: (state) => ({
      ...state,
      countNoti: 0,
    }),
    getCountNotificationSuccess: (state, action) => ({
      ...state,
      countNoti: action.payload.result,
    }),
    getCountNotificationFail: (state) => ({
      ...state,
      countNoti: 0,
    }),
    makeNotificationIsRead: (state) => ({
      ...state,
    }),
    makeNotificationIsReadSuccess: (state) => ({
      ...state,
    }),
    makeNotificationIsReadFail: (state) => ({
      ...state,
    }),
    makeAllNotificationsRead: (state) => ({
      ...state,
    }),
    makeAllNotificationsReadSuccess: (state) => ({
      ...state, 
      }),
    makeAllNotificationsReadFail: (state) => ({
      ...state, 
    }),
  }
})

export const {
  getListNotification,
  getListNotificationSuccess,
  getListNotificationFail,
  getCountNotification,
  getCountNotificationSuccess,  
  getCountNotificationFail,
  makeNotificationIsRead,
  makeNotificationIsReadSuccess,  
  makeNotificationIsReadFail,
  makeAllNotificationsRead,
  makeAllNotificationsReadSuccess,
  makeAllNotificationsReadFail,
} = notificationSlice.actions

export default notificationSlice.reducer;