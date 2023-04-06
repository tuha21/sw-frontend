import {updateAlerts, updatePositionApi, updateTikTokOrder} from "../actions/action";
import {callApi} from "./baseApi";

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
            dispatch(updateAlerts({value: "Xác nhận đơn hàng thành công", type: 'success'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: "Xác nhận đơn hàng thành công", type: 'success'}, false))
            window.open(res.data.data);
        }
        dispatch(updatePositionApi('confirmOrder', false))
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
            dispatch(updateAlerts({value: "Tạo mẫu in thành công", type: 'success'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: "Tạo mẫu in thành công", type: 'success'}, false))
            window.open(res.data.data);
        }
        dispatch(updatePositionApi('printOrder', false))
    });
}


export const getOrderHistories = (
    id
) => {
    const options = {
        url: `/api/v1/tiktok-orders/print?orderId=${id}`,
        method: "GET",
    };

    return callApi(options).then(async (res) => {
        return res?.data?.data;
    });
}
