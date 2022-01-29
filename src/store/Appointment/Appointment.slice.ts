import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Appointment } from 'app/entities/Appointment';

export type AppointmentSlice = {
    appointments: Appointment[];
    selectedDate: Date;
    loading: boolean;
};

const INITIAL_STATE: AppointmentSlice = {
    appointments: [],
    selectedDate: new Date(),
    loading: false,
};
const appointmentSlice = createSlice({
    name: 'Appointment',
    initialState: INITIAL_STATE,
    reducers: {
        setLoading: (state, action: PayloadAction<{ loading?: boolean }>) => {
            state.loading = !!action.payload.loading;
        },
        setAppointments: (
            state,
            action: PayloadAction<{ appointments: Appointment[] }>,
        ) => {
            state.appointments = action.payload.appointments;
        },
        setSelectedDate: (state, action: PayloadAction<{ date: Date }>) => {
            state.selectedDate = action.payload.date;
        },
    },
});

export const { reducer: appointmentReducer } = appointmentSlice;

export const { setAppointments, setLoading, setSelectedDate } =
    appointmentSlice.actions;
