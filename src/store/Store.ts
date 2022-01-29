import React from 'react';
import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { loadingReducer } from './Loading/Loading.slice';
import { userReducer } from './User/User.slice';
import { studentReducer } from './Student/Student.slice';
import { appointmentReducer } from './Appointment/Appointment.slice';
import { alertReducer } from './Alert/Alert.slice';

export const store = configureStore({
    reducer: {
        alertReducer,
        appointmentReducer,
        loadingReducer,
        userReducer,
        studentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useReduxSelector = <T, R>(
    reducer: string,
    selector: (val: T) => R,
    isEql?: (a: R | null, b: R) => boolean,
) => {
    const patchedSelector = React.useMemo(() => {
        let prevValue: R | null = null;
        return (state: T) => {
            const nextValue: R = selector(state[reducer]);
            if (prevValue !== null && isEql?.(prevValue, nextValue)) {
                return prevValue;
            }
            prevValue = nextValue;
            return nextValue;
        };
    }, [isEql]);

    return useAppSelector(patchedSelector as any);
};
