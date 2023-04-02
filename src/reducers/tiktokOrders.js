const initState = {
    orderList: [],
    totalOrder: 0
}

const tiktokOrders = (state = initState, action) => {
    switch(action.type) {
        case 'update_tiktok_order':
            return {
                ...state,
                [action.field]: action.value
            }
        default: return state;
    }
}

export default tiktokOrders;