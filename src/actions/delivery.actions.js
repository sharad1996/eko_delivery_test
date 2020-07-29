import { deliveryConstants } from '../constants'

function setData(data) {
    return { type: deliveryConstants.SET_DATA, data };
};

export const deliveryActions = {
    setData
};
