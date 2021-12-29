import { Completer } from 'app/utils/Completer';
import {
    ActionTypes,
    ActionAlertUpdateIsOpen,
    ActionAlertUpdateTexts,
    ActionAlertUpdateTaskStatus,
    AlertAsyncResponses,
    TextsType,
} from './Alert.types';

export const actionAlertUpdateIsOpen = (
    isOpen: boolean,
): ActionAlertUpdateIsOpen => {
    return {
        type: ActionTypes.ALERT_UPDATE_IS_OPEN,
        payload: {
            isOpen,
        },
    };
};

export const actionAlertUpdateTexts = (
    texts: TextsType,
): ActionAlertUpdateTexts => {
    return {
        type: ActionTypes.ALERT_UPDATE_TEXTS,
        payload: { texts },
    };
};

export const actionAlertUpdateTaskStatus = (
    taskStatus: Completer<AlertAsyncResponses> | null,
): ActionAlertUpdateTaskStatus => {
    return {
        type: ActionTypes.ALERT_UPDATE_TASK_STATUS,
        payload: { taskStatus },
    };
};
