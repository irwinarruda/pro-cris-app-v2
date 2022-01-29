import React from 'react';

import { useAppDispatch, useReduxSelector } from 'app/store/Store';
import {
    setAppointments,
    setLoading,
    setSelectedDate,
    AppointmentSlice,
} from 'app/store/Appointment/Appointment.slice';

import { AppointmentService } from 'app/services/AppointmentService';
import { FormValues as CreateFormValues } from 'app/forms/createAppointment';
import { FormValues as UpdateFormValues } from 'app/forms/manageAppointment';
import { Appointment } from 'app/entities/Appointment';

import { genericSelector } from 'app/utils/genericSelector';
import { shallowEqual } from 'app/utils/shallowEqual';

const selectors = {
    all: ['appointments', 'selectedDate', 'loading'],
    status: ['appointments'],
    loading: ['loading'],
    date: ['selectedDate'],
    none: [],
} as const;

type SelectorsKeys = keyof typeof selectors;

type AppointmentSliceFunctions = {
    listAppointments(): Promise<void>;
    createTodaysRoutineAppointments(): Promise<void>;
    createAppointment(appointment: CreateFormValues): Promise<void>;
    updateAppointmentOptions(appointment: UpdateFormValues): Promise<void>;
    updateSelectedDate(date: Date): void;
    getAppointmentsByRoutineDate(date: Date): Promise<Appointment[]>;
    simpleUpdateAppointment(appointment: UpdateFormValues): Promise<void>;
};

export const useAppointmentStore = <T extends SelectorsKeys>(
    key = 'none' as T,
): Pick<AppointmentSlice, typeof selectors[T][number]> &
    AppointmentSliceFunctions => {
    const hooks = useReduxSelector(
        'appointmentReducer',
        genericSelector(selectors[key] as any),
        shallowEqual,
    ) as Pick<AppointmentSlice, typeof selectors[T][number]>;

    const dispatch = useAppDispatch();

    const updateSelectedDate = React.useCallback((date: Date) => {
        dispatch(setSelectedDate({ date }));
    }, []);

    const listAppointments = React.useCallback(async () => {
        dispatch(setLoading({ loading: true }));
        const appointmentService = new AppointmentService();
        const appointments = await appointmentService.listAppointments();
        dispatch(setAppointments({ appointments }));
        dispatch(setLoading({ loading: false }));
    }, []);

    const createAppointment = React.useCallback(
        async (appointment: CreateFormValues) => {
            const appointmentService = new AppointmentService();
            await appointmentService.createAppointment(appointment);
            listAppointments();
        },
        [listAppointments],
    );

    const updateAppointmentOptions = React.useCallback(
        async (appointment: UpdateFormValues) => {
            const appointmentService = new AppointmentService();
            await appointmentService.updateAppointment(appointment);
            listAppointments();
        },
        [listAppointments],
    );

    const simpleUpdateAppointment = React.useCallback(
        async (appointment: UpdateFormValues) => {
            const appointmentService = new AppointmentService();
            await appointmentService.updateAppointment(appointment);
        },
        [],
    );

    const createTodaysRoutineAppointments = React.useCallback(async () => {
        const dateToday = new Date();
        const appointmentService = new AppointmentService();
        await appointmentService.createRoutineByDate(dateToday);
        listAppointments();
    }, [listAppointments]);

    const getAppointmentsByRoutineDate = React.useCallback(
        async (date: Date): Promise<Appointment[]> => {
            const appointmentService = new AppointmentService();
            dispatch(setLoading({ loading: true }));
            const appointments = await appointmentService.listRoutineByDate(
                date,
            );
            dispatch(setLoading({ loading: false }));
            return appointments;
        },
        [],
    );

    return {
        ...hooks,
        simpleUpdateAppointment,
        updateAppointmentOptions,
        listAppointments,
        createAppointment,
        updateSelectedDate,
        createTodaysRoutineAppointments,
        getAppointmentsByRoutineDate,
    };
};
