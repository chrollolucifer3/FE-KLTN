import callApi from "api/callApi";

import {
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
} from "../../states/modules/notification"


export const getAllNoti = (dataFilter = {
    perPage: 10,
    page: 1
}) => async (dispatch, getState) => {
    let path = `notification/list?size=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
        path += `&search=${dataFilter.keySearch}`;
    }

    // if (dataFilter.status && dataFilter.status.length > 0) {
    //   path += `&status=${dataFilter.status}`;
    // }

    if (dataFilter.order && dataFilter.column) {
        path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
    }

    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [getListNotification,
            getListNotificationSuccess,
            getListNotificationFail
        ],
        variables: {},
        dispatch,
        getState,
    })
}

export const getCountNoti = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `notification/unread`,
        actionTypes: [getCountNotification,
            getCountNotificationSuccess,
            getCountNotificationFail
        ],
        variables: {},
        dispatch,
        getState,
    })
}

export const NotificationIsRead = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `notification/markAsRead`,
        actionTypes: [makeNotificationIsRead,
            makeNotificationIsReadSuccess,
            makeNotificationIsReadFail,
        ],
        variables: data,
        dispatch,
        getState,
    })
}

export const NotificationMarkAllRead = () => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `notification/markAllAsRead`,
        actionTypes: [makeAllNotificationsRead,
            makeAllNotificationsReadSuccess,
            makeAllNotificationsReadFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}