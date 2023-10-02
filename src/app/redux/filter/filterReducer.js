import { STATUS_CHANGE, COLOR_CHANGE, SORT_CHANGE } from "./filterTypes";


const initialState = {
    status: '',
    colors: '',
    sortBy: '',
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATUS_CHANGE: return {
            ...state,
            status: action.payload
        }
        case COLOR_CHANGE: return {
            ...state,
            colors: action.payload
        }
        case SORT_CHANGE: return {
            ...state,
            sortBy: action.payload
        }
        default: return state
    }
}

export default filterReducer