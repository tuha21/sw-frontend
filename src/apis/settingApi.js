import axios from 'axios';
import { updateChannelProduct, updatePositionApi, updateSetting } from '../actions/action';

const env = 1
const PRODUCT_DOMAIN = env === 1 ? 'https://sw-service-production.up.railway.app' : 'http://localhost:8080'
export const callApi = async (options) => {
  options = {
    ...options,
    url: PRODUCT_DOMAIN + options.url
  }
  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
  }
};


export const connectShop = () => (dispatch, getState) => {
  const { setting: { tenantId } } = getState();
  var options = {
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
  var options = {
    url: '/api/v1/connect/all?tenantId=1',
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.data) {
      dispatch(updateSetting('connections', res.data.data));
      dispatch(updatePositionApi('getConnections', false))
    }
  });
};

export const getChannelProducts = () => (dispatch, getState) => {
  dispatch(updatePositionApi('getChannelProducts', true))
  const { setting: { connections } } = getState();
  var connectionIds = connections.map(c => c.id);
  var options = {
    url: `/api/v1/channel-product/filter?connectionIds=${connectionIds}`,
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.data) {
      dispatch(updateChannelProduct('channelProducts', res.data.data));
      dispatch(updatePositionApi('getChannelProducts', false))
    }
  });
};