import {updatePositionApi, updateSwProduct} from "../actions/action";
import {callApi} from "./baseApi";

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
            dispatch(updateSwProduct('totalProduct', res.data.data.total));
        }
        dispatch(updatePositionApi('getSwProducts', false))
    });
};