import { STATUS } from "../constants"

export function getColorStatus(status) {
    switch (status) {
        case STATUS.complete:
            return 'green'
        case STATUS.incomplete:
        default:
            return 'grey'
    }
}

export function getNameStatus(status) {
    switch (status) {
        case STATUS.complete:
            return 'Complete'
        case STATUS.incomplete:
        default:
            return 'Incomplete'
    }
}