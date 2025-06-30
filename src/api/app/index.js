import callApi from "../callApi";
import {
  startRequest, requestSuccess, requestError
} from "../../states/modules/app";

export const getList = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    url: '/starter-pack/whitelist-round-status',
    actionTypes: [startRequest, requestSuccess, requestError],
    variables: {},
    dispatch,
    getState
  })
}
