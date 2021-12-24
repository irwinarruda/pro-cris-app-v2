import { Actions, ActionTypes, UserStore } from './User.types';

const INITIAL_STATE: UserStore = {
    user: {
        name: '',
        avatar: '',
        email: '',
        id: '',
        phone: '',
    },
    loading: false,
};

export const userReducer = (state = INITIAL_STATE, action: Actions) => {
    switch (action.type) {
        case ActionTypes.USER_UPDATE:
            return { ...state, user: action.payload?.user };
        case ActionTypes.USER_LOADING:
            return { ...state, loading: action.payload?.loading };
        case ActionTypes.USER_RESET:
            return { ...state, user: { ...INITIAL_STATE.user } };
        default:
            return state;
    }
};
