import React from 'react';

import {
    setLoading as actionSetLoading,
    LoadingSlice,
} from 'app/store/Loading/Loading.slice';
import { useAppDispatch, useReduxSelector } from 'app/store/Store';

import { genericSelector } from 'app/utils/genericSelector';
import { shallowEqual } from 'app/utils/shallowEqual';

const selectors = {
    all: ['loading'],
    none: [],
} as const;

type SelectorsKeys = keyof typeof selectors;

type LoadingSliceFunctions = {
    setLoading(loading: boolean): void;
};

export const useLoadingStore = <T extends SelectorsKeys = 'none'>(
    key = 'none' as T,
): Pick<LoadingSlice, typeof selectors[T][number]> & LoadingSliceFunctions => {
    const hooks = useReduxSelector(
        'loadingReducer',
        genericSelector(selectors[key] as any),
        shallowEqual,
    ) as Pick<LoadingSlice, typeof selectors[T][number]>;

    const dispatch = useAppDispatch();

    const setLoading = React.useCallback((loading: boolean) => {
        dispatch(actionSetLoading({ loading }));
    }, []);

    return { ...hooks, setLoading };
};
