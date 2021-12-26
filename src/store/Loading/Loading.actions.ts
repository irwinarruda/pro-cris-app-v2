import { ActionTypes, ActionLoading } from './Loading.types';

export const actionLoading = (loading: boolean): ActionLoading => {
    return {
        type: ActionTypes.LOADING_UPDATE,
        payload: {
            loading: loading,
        },
    };
};
