import React from 'react';
import { useDispatch } from 'react-redux';

import { useReduxSelector } from 'app/store/Store';
import { LoadingStore } from 'app/store/Loading/Loading.types';
import { actionLoading } from 'app/store/Loading/Loading.actions';

import { genericSelector } from 'app/utils/genericSelector';
import { shallowEqual } from 'app/utils/shallowEqual';

const neededStates = {
    all: ['loading'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type LoadingStoreFunctions = {
    setLoading(loading: boolean): void;
};

export const useLoadingStore = <T extends NeededStatesKeys = 'none'>(
    key = 'none' as T,
): Pick<LoadingStore, typeof neededStates[T][number]> &
    LoadingStoreFunctions => {
    let hooks = useReduxSelector(
        'loadingStore',
        genericSelector(neededStates[key] as any),
        shallowEqual,
    ) as Pick<LoadingStore, typeof neededStates[T][number]>;

    const dispatch = useDispatch();

    const setLoading = React.useCallback((loading: boolean) => {
        dispatch(actionLoading(loading));
    }, []);

    return { ...hooks, setLoading };
};
