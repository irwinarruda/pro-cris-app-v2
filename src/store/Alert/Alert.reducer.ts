import { Actions, ActionTypes, AlertStore } from './Alert.types';

const INITIAL_STATE: AlertStore = {
    texts: {
        title: '',
        description: '',
        cancelButtonProps: {},
        cancelButtonText: '',
        confirmButtomProps: {},
        confirmButtomText: '',
    },
    taskStatus: null,
    isOpen: false,
};

export const alertReducer = (state = INITIAL_STATE, action: Actions) => {
    switch (action.type) {
        case ActionTypes.ALERT_UPDATE_IS_OPEN:
            return { ...state, isOpen: action.payload?.isOpen };
        case ActionTypes.ALERT_UPDATE_TEXTS:
            return {
                ...state,
                texts: { ...state.texts, ...action.payload?.texts },
            };
        case ActionTypes.ALERT_UPDATE_TASK_STATUS:
            return {
                ...state,
                taskStatus: action.payload?.taskStatus,
            };
        default:
            return state;
    }
};
