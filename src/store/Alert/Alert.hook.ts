import React from 'react';
import { useDispatch } from 'react-redux';

import { useReduxSelector } from 'app/store/Store';
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

import { genericSelector } from 'app/utils/genericSelector';
import { shallowEqual } from 'app/utils/shallowEqual';

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
    let hooks = useReduxSelector(
        'alertStore',
        genericSelector(neededStates[key] as any),
        shallowEqual,
    ) as Pick<AlertStore, typeof neededStates[T][number]>;

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
