import React from 'react';

import { useAppDispatch, useReduxSelector } from 'app/store/Store';
import {
    setTaskStatus,
    closeAlert,
    showAlertWithTexts,
    AlertAsyncResponses,
    TextsType,
    AlertSlice,
} from 'app/store/Alert/Alert.slice';

import { Completer } from 'app/utils/Completer';
import { genericSelector } from 'app/utils/genericSelector';
import { shallowEqual } from 'app/utils/shallowEqual';

const selectors = {
    all: ['isOpen', 'texts', 'taskStatus'],
    none: [],
} as const;

type SelectorsKeys = keyof typeof selectors;

type AlertSliceFunctions = {
    showAlert(data?: TextsType): void;
    showAlertAsync(data?: TextsType): Promise<AlertAsyncResponses>;
    closeModal(data?: AlertAsyncResponses): void;
};

export const useAlert = <T extends SelectorsKeys>(
    key = 'none' as T,
): Pick<AlertSlice, typeof selectors[T][number]> & AlertSliceFunctions => {
    const hooks = useReduxSelector(
        'alertReducer',
        genericSelector(selectors[key] as any),
        shallowEqual,
    ) as Pick<AlertSlice, typeof selectors[T][number]>;

    const dispatch = useAppDispatch();

    const showAlert = React.useCallback((data: TextsType) => {
        dispatch(showAlertWithTexts({ texts: data }));
    }, []);

    const showAlertAsync = React.useCallback(async (data?: TextsType) => {
        dispatch(showAlertWithTexts({ texts: data }));
        const task = new Completer<AlertAsyncResponses>();
        dispatch(setTaskStatus({ task }));
        return task.promise;
    }, []);

    const closeModal = React.useCallback((status?: AlertAsyncResponses) => {
        dispatch(setTaskStatus({ status }));
        dispatch(closeAlert());
    }, []);

    return { ...hooks, showAlert, showAlertAsync, closeModal };
};
