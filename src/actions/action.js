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

export const updateTikTokOrder = (field, value) => ({
    type: 'update_tiktok_order',
    field, value
})

export const updateSwProduct = (field, value) => ({
    type: 'update_sw_product',
    field, value
})

export const updateAlerts = (value, status) => ({
    type: 'update_alerts',
    status,
    value
})
