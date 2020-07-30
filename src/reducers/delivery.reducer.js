import { deliveryConstants } from '../constants'
import { convertToValidArray } from '../utils'

// Predefined inputs
const preDefinedInput = ['AB1', 'AC4', 'AD10', 'BE3', 'CD4', 'CF2', 'DE1', 'EB3', 'EA2', 'FD1']

let initialState = {
    data: convertToValidArray(preDefinedInput)
}

export function delivery(state = initialState, action) {
    switch (action.type) {
        case deliveryConstants.SET_DATA:
            return {
                ...state,
                data: action.data
            }
        default:
            return { ...state }
    }
}
