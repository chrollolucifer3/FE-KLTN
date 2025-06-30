import callApi from "api/callApi";

import {
  getListDocument,
  getListDocumentSuccess,
  getListDocumentFail,
  approveDocument,
  approveDocumentSuccess,
  approveDocumentFail,
  rejectDocument,
  rejectDocumentSuccess,
  rejectDocumentFail,
  getCountByDocument,
  getCountDocumentSuccess,
  getCountDocumentFail,
  getListMyDocument,
  getListMyDocumentSuccess,
  getListMyDocumentFail,
  deleteDocument,
  deleteDocumentSuccess,
  deleteDocumentFail,
} from "states/modules/document/index";

export const getAllDocument =
  (
    dataFilter = {
      perPage: 10,
      page: 1,
    }
  ) =>
  async (dispatch, getState) => {
    let path = `document/getAll?size=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
      path += `&search=${dataFilter.keySearch}`;
    }

    if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
    }

    return callApi({
      method: "get",
      apiPath: path,
      actionTypes: [
        getListDocument,
        getListDocumentSuccess,
        getListDocumentFail,
      ],
      variables: {},
      dispatch,
      getState,
      role: "admin", // thêm role là 'admin'
    });
  };

export const getAllDocumentForClient =
  (
    dataFilter = {
      perPage: 10,
      page: 1,
    }
  ) =>
  async (dispatch, getState) => {
    let path = `document/getAll?size=${dataFilter.perPage}&page=${dataFilter.page}`;
    if (dataFilter.keySearch) {
      path += `&search=${dataFilter.keySearch}`;
    }
    if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
    }
    return callApi({
      method: "get",
      apiPath: path,
      actionTypes: [
        getListDocument,
        getListDocumentSuccess,
        getListDocumentFail,
      ],
      variables: {},
      dispatch,
      getState,
      role: "client",
    });
  };

export const getAllDocumentForAdmin =
  (
    dataFilter = {
      perPage: 10,
      page: 1,
    }
  ) =>
  async (dispatch, getState) => {
    let path = `document/getAllForAdmin?size=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
      path += `&search=${dataFilter.keySearch}`;
    }

    if (dataFilter.status && dataFilter.status.length > 0) {
      path += `&status=${dataFilter.status}`;
    }

    if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
    }

    return callApi({
      method: "get",
      apiPath: path,
      actionTypes: [
        getListDocument,
        getListDocumentSuccess,
        getListDocumentFail,
      ],
      variables: {},
      dispatch,
      getState,
      role: "admin", // thêm role là 'admin'
    });
  };

export const approveDocumentForAdmin = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `document/approveOrReject`,
    variables: data,
    actionTypes: [approveDocument, approveDocumentSuccess, approveDocumentFail],
    dispatch,
    getState,
    role: "admin", // thêm role là 'admin'
  });
};

export const rejectDocumentForAdmin = (data) => async (dispatch, getState) => {
  console.log("Rejecting document with data:", data);

  return callApi({
    method: "post",
    apiPath: `document/approveOrReject`,
    variables: data,
    actionTypes: [rejectDocument, rejectDocumentSuccess, rejectDocumentFail],
    dispatch,
    getState,
    role: "admin", // thêm role là 'admin'
  });
};

export const countDocumentInMonth = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `document/count`,
    actionTypes: [
      getCountByDocument,
      getCountDocumentSuccess,
      getCountDocumentFail,
    ],
    variables: {},
    dispatch,
    getState,
    role: "admin", // thêm role là 'admin'
  });
};

export const uploadDocument = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `document`,
    variables: data,
    actionTypes: [getListDocument, getListDocumentSuccess, getListDocumentFail],
    dispatch,
    getState,
    role: "client", // thêm role là 'client'
    isFormData: true,
  });
};

export const getMyDocumentForClient =
  (
    dataFilter = {
      perPage: 10,
      page: 1,
    }
  ) =>
  async (dispatch, getState) => {
    let path = `document/myDocuments?size=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
      path += `&search=${dataFilter.keySearch}`;
    }

    if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
    }

    return callApi({
      method: "get",
      apiPath: path,
      actionTypes: [
        getListMyDocument,
        getListMyDocumentSuccess,
        getListMyDocumentFail,
      ],
      variables: {},
      dispatch,
      getState,
      role: "client", // thêm role là 'client'
    });
  };

export const deleteDocumentForUser = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `document/delete`,
    actionTypes: [deleteDocument, deleteDocumentSuccess, deleteDocumentFail],
    variables: data,
    dispatch,
    getState,
  });
};
