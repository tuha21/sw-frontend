export const updateSetting = (field, value) => ({
    type: 'update_setting',
    field, value
})

export const updatePositionApi = (value, status) => ({
    type: 'update_position_api',
    status,
    value
})

export const updateChannelProduct = (field, value) => ({
    type: 'update_channel_product',
    field, value
})