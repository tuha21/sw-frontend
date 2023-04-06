import {updateChannelProduct, updatePositionApi} from "../actions/action";
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


export const unMap = (
    id
) => (dispatch, getState) => {
    dispatch(updatePositionApi('quickMap', true))
    const options = {
        url: `/api/v1/channel-product/un-map?id=${id}`,
        method: "GET",
    };

    callApi(options).then((res) => {
        if (res?.data?.error) {
            alert(res.data.error)
        } else {
            alert('Hủy liên kết thàng công')
        }
        dispatch(updatePositionApi('quickMap', false))
    });
}