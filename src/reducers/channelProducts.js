const initState = {
    channelProducts: [],
    totalProduct: 0
}

const channelProduct = (state = initState, action) => {
    switch(action.type) {
        case 'update_channel_product':
            return {
                ...state,
                [action.field]: action.value
            }
        default: return state;
    }
}

export default channelProduct;