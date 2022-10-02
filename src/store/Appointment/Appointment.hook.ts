import React from 'react';
import { useDispatch } from 'react-redux';

import { AppointmentService } from 'app/services/AppointmentService';
import { FormValues as CreateFormValues } from 'app/forms/createAppointment';
import { FormValues as UpdateFormValues } from 'app/forms/manageAppointment';

import { useReduxSelector } from 'app/store/Store';
import { AppointmentStore } from 'app/store/Appointment/Appointment.types';
import {
    actionAppointmentUpdateAll,
    actionAppointmentUpdateDate,
    actionAppointmentUpdateLoading,
} from 'app/store/Appointment/Appointment.actions';
import { Appointment } from 'app/entities/Appointment';

import { genericSelector } from 'app/utils/genericSelector';
import { shallowEqual } from 'app/utils/shallowEqual';

const neededStates = {
    all: ['appointments', 'selectedDate', 'loading'],
    status: ['appointments'],
    loading: ['loading'],
    date: ['selectedDate'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type AppointmentStoreFunctions = {
    listAppointments(): Promise<void>;
    createTodaysRoutineAppointments(date?: Date): Promise<void>;
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
    let hooks = useReduxSelector(
        'appointmentStore',
        genericSelector(neededStates[key] as any),
        shallowEqual,
    ) as Pick<AppointmentStore, typeof neededStates[T][number]>;

    const dispatch = useDispatch();

    const updateSelectedDate = React.useCallback((date: Date) => {
        dispatch(actionAppointmentUpdateDate(date));
    }, []);

    const listAppointments = React.useCallback(async () => {
        try {
            dispatch(actionAppointmentUpdateLoading(true));
            const appointmentService = new AppointmentService();
            const appointments = await appointmentService.listAppointments();
            dispatch(actionAppointmentUpdateAll(appointments));
        } catch (err) {
            throw err;
        } finally {
            dispatch(actionAppointmentUpdateLoading(false));
        }
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

    const createTodaysRoutineAppointments = React.useCallback(
        async (date?: Date) => {
            try {
                const dateToday = date || new Date();
                const appointmentService = new AppointmentService();
                await appointmentService.createRoutineByDate(dateToday);
            } catch (err) {
                throw err;
            } finally {
                listAppointments();
            }
        },
        [listAppointments],
    );

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
