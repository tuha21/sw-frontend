import axios from 'axios';
import {
  updateAlerts,
  updateChannelProduct,
  updatePositionApi,
  updateSetting,
  updateSwProduct,
  updateTikTokOrder
} from '../actions/action';

const env = 1
const PRODUCT_DOMAIN = env === 1 ? 'https://sw-service-production.up.railway.app' : 'http://localhost:8080'
export const callApi = async (options) => {
  options = {
    ...options,
    url: PRODUCT_DOMAIN + options.url
  }
  try {
    return await axios(options);
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
  }
};


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

export const getChannelProducts = (selectedConnections, query, mappingStatus, page, limit) => (dispatch, getState) => {
  dispatch(updatePositionApi('getChannelProducts', true))
  dispatch(updateChannelProduct('channelProducts', []));
  const search = `connectionIds=${selectedConnections}&mappingStatus=${mappingStatus}&query=${query}&page=${page - 1}&limit=${limit}`;
  const options = {
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
  dispatch(updatePositionApi('getTikTokOrders', true))
  const options = {
    url: `/api/v1/tiktok-orders/filter?connectionIds=${connectionIds}&orderStatus=${orderStatus}&query=${query}&page=${page - 1}&limit=${limit}`,
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.data) {
      dispatch(updateTikTokOrder('orderList', res.data.data))
      dispatch(updateTikTokOrder('totalOrder', res.data.total))
    }
    dispatch(updatePositionApi('getTikTokOrders', false))
  });
}

export const crawlTiktokProduct = (
  connectionIds,
  fromDate, toDate
) => (dispatch, getState) => {
  dispatch(updatePositionApi('crawlProduct', true))
  const options = {
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
  const options = {
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

export const quickCreate = (
  id
) => (dispatch, getState) => {
  dispatch(updatePositionApi('quickCreate', true))
  const options = {
    url: `/api/v1/channel-product/create?id=${id}`,
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.error) {
      alert(res.data.error)
    } else {
      alert('Khởi tạo thành công')
    }
    dispatch(updatePositionApi('quickCreate', false))
  });
}

export const printOrder = (
  id
) => (dispatch, getState) => {
  dispatch(updatePositionApi('printOrder', true))
  const options = {
    url: `/api/v1/tiktok-orders/print?orderId=${id}`,
    method: "GET",
  };

  callApi(options).then(async (res) => {
    if (res?.data?.error) {
      dispatch(updateAlerts({value: res.data.error, type: 'error'}, true))
      await new Promise(resolve => setTimeout(resolve, 2000))
      dispatch(updateAlerts({value: res.data.error, type: 'error'}, false))
    } else {
      dispatch(updateAlerts({value: res.data.error, type: 'success'}, true))
      await new Promise(resolve => setTimeout(resolve, 2000))
      dispatch(updateAlerts({value: "Tạo mẫu in thành công", type: 'success'}, false))
      window.open(res.data.data);
    }
    dispatch(updatePositionApi('printOrder', false))
  });
}

export const getSwProducts = (query, page, limit) => (dispatch, getState) => {
  dispatch(updatePositionApi('getSwProducts', true))
  dispatch(updateSwProduct('swProducts', []));
  const search = `tenantId=1&query=${query}&page=${page - 1}&limit=${limit}`;
  const options = {
    url: `/api/v1/products/filter?${search}`,
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.data?.products) {
      dispatch(updateSwProduct('swProducts', res.data.data.products));
    }
    dispatch(updatePositionApi('getSwProducts', false))
  });
};


export const crawlTiktokOrder = (
  connectionIds,
  fromDate, toDate
) => (dispatch, getState) => {
  dispatch(updatePositionApi('crawlOrders', true))
  const options = {
    url: `/api/v1/tiktok-orders/crawl?connectionIds=${connectionIds}&fromDate=${fromDate}&toDate=${toDate}`,
    method: "GET",
  };

  callApi(options).then(async (res) => {
    if (res?.data?.error) {
      dispatch(updateAlerts({value: res.data.error, type: 'error'}, true))
      await new Promise(resolve => setTimeout(resolve, 2000))
      dispatch(updateAlerts({value: res.data.error, type: 'error'}, false))
    } else {
      dispatch(updateAlerts({value: "Hệ thống đang tiến hành cập nhật dữ liệu", type: 'success'}, true))
      await new Promise(resolve => setTimeout(resolve, 2000))
      dispatch(updateAlerts({value: "Hệ thống đang tiến hành cập nhật dữ liệu", type: 'success'}, false))
    }
    dispatch(updatePositionApi('crawlOrders', false))
  });
}



export const confirmOrder = (
    type,
    id
) => (dispatch, getState) => {
  dispatch(updatePositionApi('confirmOrder', true))
  const options = {
    url: `/api/v1/tiktok-orders/confirm?orderId=${id}&type=${type}`,
    method: "GET",
  };

  callApi(options).then(async (res) => {
    if (res?.data?.error) {
      dispatch(updateAlerts({value: res.data.error, type: 'error'}, true))
      await new Promise(resolve => setTimeout(resolve, 2000))
      dispatch(updateAlerts({value: res.data.error, type: 'error'}, false))
    } else {
      dispatch(updateAlerts({value: res.data.error, type: 'success'}, true))
      await new Promise(resolve => setTimeout(resolve, 2000))
      dispatch(updateAlerts({value: "Xác nhận đơn hàng thành công", type: 'success'}, false))
      window.open(res.data.data);
    }
    dispatch(updatePositionApi('confirmOrder', false))
  });
}