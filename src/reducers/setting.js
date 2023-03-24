const initState = {
    tenantId: 1,
    connections: []
}

const setting = (state = initState, action) => {
    switch(action.type) {
        case 'update_setting':
            return {
                ...state,
                [action.field]: action.value
            } 
        default: return state;
    }
}

export default setting;