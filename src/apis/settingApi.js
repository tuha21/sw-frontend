import axios from 'axios';

const PRODUCT_DOMAIN = 'https://sw-service-production.up.railway.app';
const LOCAL_DOMAIN = 'http://localhost:8080';

export const connectShop = () => {
  var options = {
    url: '/api/v1/connect/install?tenantId=1',
    method: "GET",
  };

  callApi(options).then((res) => {
    if (res?.data?.data?.url) {
      window.parent.location.href = res.data.data.url;
    }
  });
};

export const getConnections = () => {
  var options = {
    url: '/api/v1/connect/all?tenantId=1',
    method: "GET",
  };

  return callApi(options).then((res) => {
    if (res?.data?.data) {
      return res.data.data
    }
  });
};

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
