import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppointmentService } from 'app/services/AppointmentService';
import { FormValues as CreateFormValues } from 'app/forms/createAppointment';
import { FormValues as UpdateFormValues } from 'app/forms/manageAppointment';

import { ApplicationStores } from 'app/store/Store';
import { AppointmentStore } from 'app/store/Appointment/Appointment.types';
import {
    actionAppointmentUpdateAll,
    actionAppointmentUpdateDate,
    actionAppointmentUpdateLoading,
} from 'app/store/Appointment/Appointment.actions';
import { Appointment } from 'app/entities/Appointment';

const neededStates = {
    all: ['appointments', 'selectedDate', 'loading'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type AppointmentStoreFunctions = {
    listAppointments(): Promise<void>;
    createTodaysRoutineAppointments(): Promise<void>;
    createAppointment(appointment: CreateFormValues): Promise<void>;
    updateAppointmentOptions(appointment: UpdateFormValues): Promise<void>;
    updateSelectedDate(date: Date): void;
    getAppointmentsByRoutineDate(date: Date): Promise<Appointment[]>;
    simpleUpdateAppointment(appointment: UpdateFormValues): Promise<void>;
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

    const updateSelectedDate = React.useCallback((date: Date) => {
        dispatch(actionAppointmentUpdateDate(date));
    }, []);

    const listAppointments = React.useCallback(async () => {
        dispatch(actionAppointmentUpdateLoading(true));
        const appointmentService = new AppointmentService();
        const appointments = await appointmentService.listAppointments();
        dispatch(actionAppointmentUpdateAll(appointments));
        dispatch(actionAppointmentUpdateLoading(false));
    }, []);

    const createAppointment = React.useCallback(
        async (appointment: CreateFormValues) => {
            const appointmentService = new AppointmentService();
            await appointmentService.createAppointment(appointment);
            await listAppointments();
        },
        [listAppointments],
    );

    const updateAppointmentOptions = React.useCallback(
        async (appointment: UpdateFormValues) => {
            const appointmentService = new AppointmentService();
            await appointmentService.updateAppointment(appointment);
            await listAppointments();
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
        await listAppointments();
    }, [listAppointments]);

    const getAppointmentsByRoutineDate = React.useCallback(
        async (date: Date): Promise<Appointment[]> => {
            const appointmentService = new AppointmentService();
            dispatch(actionAppointmentUpdateLoading(true));
            const appointments = await appointmentService.listRoutineByDate(
                date,
            );
            dispatch(actionAppointmentUpdateLoading(false));
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
