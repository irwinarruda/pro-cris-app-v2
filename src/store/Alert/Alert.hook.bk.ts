import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ApplicationStores } from 'app/store/Store';
import {
    AlertStore,
    AlertAsyncResponses,
    TextsType,
} from 'app/store/Alert/Alert.types';
import {
    actionAlertUpdateIsOpen,
    actionAlertUpdateTexts,
    actionAlertUpdateTaskStatus,
} from 'app/store/Alert/Alert.actions';
import { Completer } from 'app/utils/Completer';

const neededStates = {
    all: ['isOpen', 'texts', 'taskStatus'],
    none: ['taskStatus'],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type AlertStoreFunctions = {
    showAlert(data?: TextsType): void;
    showAlertAsync(data?: TextsType): Promise<AlertAsyncResponses>;
    closeModal(data?: AlertAsyncResponses): void;
};

export const useAlert = <T extends NeededStatesKeys>(
    key = 'none' as T,
): Pick<AlertStore, typeof neededStates[T][number]> & AlertStoreFunctions => {
    let hooks = {} as Pick<AlertStore, typeof neededStates[T][number]>;
    hooks = useSelector((state: ApplicationStores) => {
        const obj = {} as any;
        neededStates[key as T].forEach((stateString) => {
            obj[stateString] = state.alertStore[stateString];
        });
        return obj;
    });

    const dispatch = useDispatch();

    const taskStatus = React.useMemo(
        () => (hooks as any).taskStatus,
        [(hooks as any).taskStatus],
    );

    const showAlert = React.useCallback((data?: TextsType) => {
        if (data) {
            dispatch(actionAlertUpdateTexts(data));
        }
        dispatch(actionAlertUpdateIsOpen(true));
    }, []);

    const showAlertAsync = React.useCallback(
        async (data?: TextsType) => {
            if (data) {
                dispatch(actionAlertUpdateTexts(data));
            }
            dispatch(actionAlertUpdateIsOpen(true));
            if (taskStatus) {
                taskStatus.complete({
                    isConfirmed: false,
                    isDenied: false,
                    isDismissed: false,
                });
            }
            const task = new Completer<AlertAsyncResponses>();
            dispatch(actionAlertUpdateTaskStatus(task));
            return task.promise;
        },
        [taskStatus],
    );

    const closeModal = React.useCallback(
        (data?: AlertAsyncResponses) => {
            dispatch(actionAlertUpdateIsOpen(false));
            if (taskStatus && data) {
                taskStatus.complete(data);
                dispatch(actionAlertUpdateTaskStatus(null));
            }
        },
        [taskStatus],
    );

    return { ...hooks, showAlert, showAlertAsync, closeModal };
};
