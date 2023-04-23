import {updateAlerts, updateChannelProduct, updatePositionApi} from "../actions/action";
import {callApi} from "./baseApi";

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
            dispatch(updateChannelProduct('channelProducts', res.data.data.products));
            dispatch(updateChannelProduct('totalProduct', res.data.data.total));
        }
        dispatch(updatePositionApi('getChannelProducts', false))
    });
};

export const getMappingInfo = (id) => {const options = {
        url: `/api/v1/channel-product/mapping-info?id=${id}`,
        method: "GET",
    };
    return callApi(options)
};

export const crawlTiktokProduct = (
    connectionIds,
    fromDate, toDate
) => (dispatch, getState) => {
    dispatch(updatePositionApi('crawlProduct', true))
    const options = {
        url: `/api/v1/channel-product/crawl?connectionIds=${connectionIds}&fromDate=${fromDate}&toDate=${toDate}`,
        method: "GET",
    };

    return callApi(options).then((res) => {
        dispatch(updatePositionApi('crawlProduct', false))
        return res;
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

    return callApi(options).then(async (res) => {
        if (res?.data?.error) {
            dispatch(updateAlerts({value: res.data.error, type: 'error'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: res.data.error, type: 'error'}, false))
        } else {
            dispatch(updateAlerts({value: "Liên kết sản phẩm thành công", type: 'success'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: "Liên kết sản phẩm thành công", type: 'success'}, false))
        }
        dispatch(updatePositionApi('quickMap', false))
        return res;
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


export const unMap = (
    id
) => (dispatch, getState) => {
    dispatch(updatePositionApi('unMap', true))
    const options = {
        url: `/api/v1/channel-product/un-map?id=${id}`,
        method: "GET",
    };

    callApi(options).then(async (res) => {
        if (res?.data?.error) {
            dispatch(updateAlerts({value: res.data.error, type: 'error'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: res.data.error, type: 'error'}, false))
        } else {
            dispatch(updateAlerts({value: "Hủy liên kết sản phẩm thành công", type: 'success'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: "Hủy liên kết sản phẩm thành công", type: 'success'}, false))
        }
        dispatch(updatePositionApi('unMap', false))
    });
}

export const manualMap = (
    id, variantId
) => (dispatch, getState) => {
    dispatch(updatePositionApi('quickMap', true))
    const options = {
        url: `/api/v1/channel-product/manual-map?id=${id}&variantId=${variantId}`,
        method: "GET",
    };

    callApi(options).then(async (res) => {
        if (res?.data?.error) {
            dispatch(updateAlerts({value: res.data.error, type: 'error'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: res.data.error, type: 'error'}, false))
        } else {
            dispatch(updateAlerts({value: "Liên kết sản phẩm thành công", type: 'success'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: "Liên kết sản phẩm thành công", type: 'success'}, false))
        }
        dispatch(updatePositionApi('quickMap', false))
    });
}


export const syncProduct = (
    id
) => (dispatch, getState) => {
    dispatch(updatePositionApi('sync', true))
    const options = {
        url: `/api/v1/channel-product/sync?id=${id}`,
        method: "GET",
    };

    callApi(options).then(async (res) => {
        if (res?.data?.error) {
            dispatch(updateAlerts({value: res.data.error, type: 'error'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: res.data.error, type: 'error'}, false))
        } else {
            dispatch(updateAlerts({value: "Đồng bộ thành công", type: 'success'}, true))
            await new Promise(resolve => setTimeout(resolve, 2000))
            dispatch(updateAlerts({value: "Đồng bộ thành công", type: 'success'}, false))
        }
        dispatch(updatePositionApi('sync', false))
    });
}

export const multiMap = (
    connectionIds
) => (dispatch, getState) => {
    dispatch(updatePositionApi('multiMap', true))
    const options = {
        url: `/api/v1/channel-product/multi-map?connectionIds=${connectionIds}`,
        method: "GET",
    };

    return callApi(options).then((res) => {
        dispatch(updatePositionApi('multiMap', false))
        return res;
    });
}

export const multiSync = (
    connectionIds
) => (dispatch, getState) => {
    dispatch(updatePositionApi('multiSync', true))
    const options = {
        url: `/api/v1/channel-product/multi-sync?connectionIds=${connectionIds}`,
        method: "GET",
    };

    callApi(options).then((res) => {
        dispatch(updatePositionApi('multiSync', false))
    });
}