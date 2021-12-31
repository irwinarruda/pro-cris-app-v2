import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppointmentService } from 'app/services/AppointmentService';
import { FormValues } from 'app/forms/createAppointment';

import { ApplicationStores } from 'app/store/Store';
import { AppointmentStore } from 'app/store/Appointment/Appointment.types';
import {
    actionAppointmentUpdateAll,
    actionAppointmentUpdateDate,
    actionAppointmentUpdateLoading,
} from 'app/store/Appointment/Appointment.actions';

const neededStates = {
    all: ['appointments', 'selectedDate', 'loading'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type AppointmentStoreFunctions = {
    listAppointments(): Promise<void>;
    createAppointment(appointment: FormValues): Promise<void>;
    updateSelectedDate(date: Date): void;
};

export const useAppointmentStore = <T extends NeededStatesKeys = 'none'>(
    key = 'none' as T,
): Pick<AppointmentStore, typeof neededStates[T][number]> &
    AppointmentStoreFunctions => {
    let hooks = {} as Pick<AppointmentStore, typeof neededStates[T][number]>;
    hooks = useSelector((state: ApplicationStores) => {
        const obj = {} as any;
        neededStates[key as T].forEach((stateString) => {
            obj[stateString] = state.appointmentStore[stateString];
        });
        return obj;
    });

    const dispatch = useDispatch();

    const listAppointments = React.useCallback(async () => {
        dispatch(actionAppointmentUpdateLoading(true));
        const appointmentService = new AppointmentService();
        const appointments = await appointmentService.listAppointments();
        dispatch(actionAppointmentUpdateAll(appointments));
        dispatch(actionAppointmentUpdateLoading(false));
    }, []);

    const createAppointment = React.useCallback(
        async (appointment: FormValues) => {
            const appointmentService = new AppointmentService();
            await appointmentService.createAppointment(appointment);
            await listAppointments();
        },
        [listAppointments],
    );

    const updateSelectedDate = React.useCallback((date: Date) => {
        dispatch(actionAppointmentUpdateDate(date));
    }, []);

    return {
        ...hooks,
        listAppointments,
        createAppointment,
        updateSelectedDate,
    };
};
