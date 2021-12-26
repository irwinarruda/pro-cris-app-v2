import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ApplicationStores } from 'app/store/Store';
import { LoadingStore } from 'app/store/Loading/Loading.types';
import { actionLoading } from 'app/store/Loading/Loading.actions';

const neededStates = {
    all: ['loading'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type LoadingStoreFunctions = {
    setLoading(loading: boolean): void;
};

export const useLoadingStore = <T extends NeededStatesKeys>(
    key = 'none' as T,
): Pick<LoadingStore, typeof neededStates[T][number]> &
    LoadingStoreFunctions => {
    let hooks = {} as Pick<LoadingStore, typeof neededStates[T][number]>;
    hooks = useSelector((state: ApplicationStores) => {
        const obj = {} as any;
        neededStates[key as T].forEach((stateString) => {
            obj[stateString] = state.loadingStore[stateString];
        });
        return obj;
    });

    const dispatch = useDispatch();

    const setLoading = React.useCallback((loading: boolean) => {
        dispatch(actionLoading(loading));
    }, []);

    return { ...hooks, setLoading };
};
