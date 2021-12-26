import { Actions, ActionTypes, LoadingStore } from './Loading.types';

const INITIAL_STATE: LoadingStore = {
    loading: false,
};

export const loadingReducer = (state = INITIAL_STATE, action: Actions) => {
    switch (action.type) {
        case ActionTypes.LOADING_UPDATE:
            return { loading: action.payload?.loading };
        default:
            return state;
    }
};
