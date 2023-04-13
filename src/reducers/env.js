const initState = {
    positionApi: [],
    alerts: []
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
        case 'update_alerts' : {
            if (!action.status) {
                return {
                    ...state,
                    alerts: [...state.alerts].filter(item => item.value !== action.value.value)
                }
            }
            return {
                ...state,
                alerts: [...state.alerts, action.value]
            }
        }
        default: return state;
    }
}

export default env;