import {
    ActionTypes,
    ActionUserLoading,
    ActionUserReset,
    ActionUserUpdate,
} from './User.types';

import { User } from 'app/entities/User';

export const actionUserUpdate = (user: User): ActionUserUpdate => {
    return {
        type: ActionTypes.USER_UPDATE,
        payload: {
            user: user,
        },
    };
};

export const actionUserReset = (): ActionUserReset => {
    return {
        type: ActionTypes.USER_RESET,
    };
};

export const actionUserLoading = (loading: boolean): ActionUserLoading => {
    return {
        type: ActionTypes.USER_LOADING,
        payload: {
            loading: loading,
        },
    };
};
