import { Appointment } from 'app/entities/Appointment';

export type Action<T, P> = {
    readonly type: T;
    readonly payload?: P;
};

export type AppointmentStore = {
    appointments: Appointment[];
    selectedDate: Date;
    loading: boolean;
};

export enum ActionTypes {
    APPOINTMENT_UPDATE_ALL = 'APPOINTMENT_UPDATE_ALL',
    APPOINTMENT_UPDATE_DATE = 'APPOINTMENT_UPDATE_DATE',
    APPOINTMENT_UPDATE_LOADING = 'APPOINTMENT_UPDATE_LOADING',
}

export type ActionAppointmentUpdateAll = Action<
    ActionTypes.APPOINTMENT_UPDATE_ALL,
    { appointments: Appointment[] }
>;

export type ActionAppointmentUpdateDate = Action<
    ActionTypes.APPOINTMENT_UPDATE_DATE,
    { selectedDate: Date }
>;

export type ActionAppointmentUpdateLoading = Action<
    ActionTypes.APPOINTMENT_UPDATE_LOADING,
    { loading: boolean }
>;

export type Actions =
    | ActionAppointmentUpdateAll
    | ActionAppointmentUpdateDate
    | ActionAppointmentUpdateLoading;
