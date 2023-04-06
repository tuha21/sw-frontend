import {
  updatePositionApi,
  updateSetting,
} from '../actions/action';
import {callApi} from "./baseApi";

export const connectShop = () => (dispatch, getState) => {
  const { setting: { tenantId } } = getState();
  const options = {
    url: `/api/v1/connect/install?tenantId=${tenantId}`,
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.data?.url) {
      window.parent.location.href = res.data.data.url;
    }
  });
};

export const getConnections = () => (dispatch, getState) => {
  dispatch(updatePositionApi('getConnections', true))
  const options = {
    url: '/api/v1/connect/all?tenantId=1',
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.data) {
      dispatch(updateSetting('connections', res.data.data));
    }
    dispatch(updatePositionApi('getConnections', false))
  });
};