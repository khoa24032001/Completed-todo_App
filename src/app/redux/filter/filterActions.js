import { STATUS_CHANGE, COLOR_CHANGE, SORT_CHANGE } from "./filterTypes";


export const statusChange = (status) => {
    return {
        type: STATUS_CHANGE,
        payload: status
    }
}

export const colorChange = (color) => {
    return {
        type: COLOR_CHANGE,
        payload: color
    }
}

export const sortChange = (sort) => {
    return {
        type: SORT_CHANGE,
        payload: sort
    }
}