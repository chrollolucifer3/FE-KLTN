import callApi from "api/callApi";

import {
  getListReport,
  getListReportSuccess,
  getListReportFail,
  getReportDetail,
  getReportDetailSuccess,
  getReportDetailFail,
  deleteCommentOrPost,
  deleteCommentOrPostSuccess,
  deleteCommentOrPostFail,
} from "states/modules/report/index";

export const getAllReport =
  (
    dataFilter = {
      perPage: 10,
      page: 1,
    }
  ) =>
  async (dispatch, getState) => {
    let path = `report/getAll?size=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
      path += `&search=${dataFilter.keySearch}`;
    }

    if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&sortBy=${dataFilter.column}`;
    }

    return callApi({
      method: "get",
      apiPath: path,
      actionTypes: [getListReport, getListReportSuccess, getListReportFail],
      variables: {},
      dispatch,
      getState,
      role: "admin", // thêm role là 'admin'
    });
  };

export const getReportDetailById = (data) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `report/getById`,
    actionTypes: [getReportDetail, getReportDetailSuccess, getReportDetailFail],
    variables: data,
    dispatch,
    getState,
    role: "admin", // thêm role là 'admin'
  });
};

export const deleteCommentOrPostById =
  (data) => async (dispatch, getState) => {
    return callApi({
      method: "delete",
      apiPath: `report/delete`,
      actionTypes: [
        deleteCommentOrPost,
        deleteCommentOrPostSuccess,
        deleteCommentOrPostFail,
      ],
      variables: data,
      dispatch,
      getState,
      role: "admin", // thêm role là 'admin'
    });
  };
