import { ButtonProps } from 'app/components/atoms/Button';
import { Completer } from 'app/utils/Completer';

export type Action<T, P> = {
    readonly type: T;
    readonly payload?: P;
};

export type AlertAsyncResponses = {
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean;
};

export type TextsType = {
    title?: string;
    description?: string;
    confirmButtomProps?: ButtonProps;
    confirmButtomText?: string;
    cancelButtonProps?: ButtonProps;
    cancelButtonText?: string;
};

export type AlertStore = {
    texts: TextsType;
    isOpen: boolean;
    taskStatus: Completer<AlertAsyncResponses> | null;
};

export enum ActionTypes {
    ALERT_UPDATE_IS_OPEN = 'ALERT_UPDATE_IS_OPEN',
    ALERT_UPDATE_TEXTS = 'ALERT_UPDATE_TEXTS',
    ALERT_UPDATE_TASK_STATUS = 'ALERT_UPDATE_TASK_STATUS',
}

export type ActionAlertUpdateTexts = Action<
    ActionTypes.ALERT_UPDATE_TEXTS,
    { texts: TextsType }
>;
export type ActionAlertUpdateIsOpen = Action<
    ActionTypes.ALERT_UPDATE_IS_OPEN,
    { isOpen: boolean }
>;
export type ActionAlertUpdateTaskStatus = Action<
    ActionTypes.ALERT_UPDATE_TASK_STATUS,
    { taskStatus: Completer<AlertAsyncResponses> | null }
>;

export type Actions =
    | ActionAlertUpdateIsOpen
    | ActionAlertUpdateTexts
    | ActionAlertUpdateTaskStatus;
