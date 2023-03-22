import axios from 'axios';

export const connectShop = () => {
    var options = {
        url: 'http://localhost:8080/api/v1/connect/install?tenantId=1',
        method: "GET"
    }

    callApi(options)
    .then(res => {
        debugger
        if (res?.data?.data?.url) {
            window.parent.location.href = res.data.data.url;
        }
    })
}

export const callApi = async (options) => {
    try {
        const response = await axios(options);
        return response;
      } catch (error) {
        if (error.response) {
          return error.response;
        }
        return error;
      }
}