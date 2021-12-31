import {
    ActionTypes,
    ActionAppointmentUpdateAll,
    ActionAppointmentUpdateDate,
    ActionAppointmentUpdateLoading,
} from './Appointment.types';
import { Appointment } from 'app/entities/Appointment';

export const actionAppointmentUpdateAll = (
    appointments: Appointment[],
): ActionAppointmentUpdateAll => {
    return {
        type: ActionTypes.APPOINTMENT_UPDATE_ALL,
        payload: {
            appointments,
        },
    };
};

export const actionAppointmentUpdateDate = (
    selectedDate: Date,
): ActionAppointmentUpdateDate => {
    return {
        type: ActionTypes.APPOINTMENT_UPDATE_DATE,
        payload: { selectedDate },
    };
};

export const actionAppointmentUpdateLoading = (
    loading: boolean,
): ActionAppointmentUpdateLoading => {
    return {
        type: ActionTypes.APPOINTMENT_UPDATE_LOADING,
        payload: { loading },
    };
};
