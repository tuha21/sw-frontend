const initState = {
    swProducts: [],
    totalProduct: 0
}

const swProduct = (state = initState, action) => {
    switch(action.type) {
        case 'update_sw_product':
            return {
                ...state,
                [action.field]: action.value
            }
        default: return state;
    }
}

export default swProduct;