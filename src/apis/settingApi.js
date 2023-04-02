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

export const getChannelProducts = (selectedConnections, query, mappingStatus, page, limit) => (dispatch, getState) => {
  dispatch(updatePositionApi('getChannelProducts', true))
  dispatch(updateChannelProduct('channelProducts', []));
  var search = `connectionIds=${selectedConnections}&mappingStatus=${mappingStatus}&query=${query}&page=${page - 1}&limit=${limit}`;
  var options = {
    url: `/api/v1/channel-product/filter?${search}`,
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

export const crawlTiktokProduct = (
  connectionIds,
  fromDate, toDate
) => (dispatch, getState) => {
  dispatch(updatePositionApi('crawlProduct', true))
  var options = {
    url: `/api/v1/channel-product/crawl?connectionIds=${connectionIds}&fromDate=${fromDate}&toDate=${toDate}`,
    method: "GET",
  };

  callApi(options).then((res) => {
    dispatch(updatePositionApi('crawlProduct', false))
  });
}


export const quickMap = (
  id
) => (dispatch, getState) => {
  dispatch(updatePositionApi('quickMap', true))
  var options = {
    url: `/api/v1/channel-product/quick-map?id=${id}`,
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.error) {
      alert(res.data.error)
    } else {
      alert('Liên kết thàng công')
    }
    dispatch(updatePositionApi('quickMap', false))
  });
}