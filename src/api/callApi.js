import { isFunction } from "lodash";
import { getClientToken, getAdminToken } from "../utils/localStorage";
import axiosInstance from "./axiosInstance";

export default async function callApi({
  method,
  apiPath,
  actionTypes: [requestType, successType, failureType],
  variables,
  params,
  dispatch,
  getState,
  headers,
  role = "client",
  isFormData = false,
}) {
  if (!isFunction(dispatch) || !isFunction(getState)) {
    throw new Error("callApi requires dispatch and getState functions");
  }

  const token = role === "admin" ? getAdminToken() : getClientToken();

  const header = {
    Authorization: token ? `Bearer ${token}` : "",
    ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
  };

  dispatch(requestType());

  return axiosInstance({
    method: method,
    url: apiPath,
    headers: headers ? { ...headers, ...header } : header,
    data: variables,
    params: method === "get" ? variables : params,
  })
    .then((response) => {
      dispatch(successType(response.data));
      return response.data;
    })
    .catch((error) => {
      dispatch(failureType(error?.response));
      return Promise.reject(error);
    });
}