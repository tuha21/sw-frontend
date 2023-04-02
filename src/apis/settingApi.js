import axios from 'axios';
import { updateChannelProduct, updatePositionApi, updateSetting, updateTikTokOrder } from '../actions/action';

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
    }
    dispatch(updatePositionApi('getConnections', false))
  });
};

export const getChannelProducts = (page, mappingStatus, query) => (dispatch, getState) => {
  dispatch(updatePositionApi('getChannelProducts', true))
  dispatch(updateChannelProduct('channelProducts', []));
  const { setting: { connections } } = getState();
  var connectionIds = connections.map(c => c.id);
  var options = {
    url: `/api/v1/channel-product/filter?connectionIds=${connectionIds}&mappingStatus=${mappingStatus}&query=${query}&page=${page}`,
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.data) {
      dispatch(updateChannelProduct('channelProducts', res.data.data));
    }
    dispatch(updatePositionApi('getChannelProducts', false))
  });
};

export const getTikTokOrders = (
  page,
  limit,
  connectionIds,
  orderStatus,
  query
) => (dispatch, getState) => {
  dispatch(updatePositionApi('getTikTokOrder', true))
  var options = {
    url: `/api/v1/tiktok-orders/filter?connectionIds=${connectionIds}&orderStatus=${orderStatus}&query=${query}&page=${page - 1}&limit=${limit}`,
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.data) {
      dispatch(updateTikTokOrder('orderList', res.data.data))
      dispatch(updateTikTokOrder('totalOrder', res.data.total))
    }
    dispatch(updatePositionApi('getTikTokOrder', false))
  });
}