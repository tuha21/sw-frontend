const initState = {
    positionApi: []
}

const env = (state = initState, action) => {
    switch(action.type) {
        case 'update_position_api': {
            if (!action.status) {
                return {
                    ...state,
                    positionApi: [...state.positionApi].filter(item => item !== action.value)
                }
            }
            return {
                ...state,
                positionApi: [...state.positionApi, action.value]
            }
        } 
        default: return state;
    }
}

export default env;