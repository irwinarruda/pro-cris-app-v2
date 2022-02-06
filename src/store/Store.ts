import React from 'react';
import { Store, createStore, combineReducers, applyMiddleware } from 'redux';
import { useSelector } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { loadingReducer } from './Loading/Loading.reducer';
import { LoadingStore } from './Loading/Loading.types';
import { userReducer } from './User/User.reducer';
import { UserStore } from './User/User.types';
import { alertReducer } from './Alert/Alert.reducer';
import { AlertStore } from './Alert/Alert.types';
import { studentReducer } from './Student/Student.reducer';
import { StudentStore } from './Student/Student.types';
import { appointmentReducer } from './Appointment/Appointment.reducer';
import { AppointmentStore } from './Appointment/Appointment.types';

export type ApplicationStores = {
    userStore: UserStore;
    loadingStore: LoadingStore;
    alertStore: AlertStore;
    studentStore: StudentStore;
    appointmentStore: AppointmentStore;
};

const rootReducer = combineReducers({
    userStore: userReducer,
    loadingStore: loadingReducer,
    alertStore: alertReducer,
    studentStore: studentReducer,
    appointmentStore: appointmentReducer,
});

const store: Store<ApplicationStores> = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

export const useReduxSelector = <T extends Record<string, any>, R>(
    reducer: keyof T,
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

    return useSelector(patchedSelector as any);
};

export { store };
