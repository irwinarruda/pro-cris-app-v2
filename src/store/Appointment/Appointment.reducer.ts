import { Actions, ActionTypes, AppointmentStore } from './Appointment.types';

const INITIAL_STATE: AppointmentStore = {
    appointments: [],
    selectedDate: new Date(),
    loading: false,
};

export const appointmentReducer = (state = INITIAL_STATE, action: Actions) => {
    switch (action.type) {
        case ActionTypes.APPOINTMENT_UPDATE_ALL:
            return { ...state, appointments: action.payload?.appointments };
        case ActionTypes.APPOINTMENT_UPDATE_DATE:
            return {
                ...state,
                selectedDate: action.payload?.selectedDate,
            };
        case ActionTypes.APPOINTMENT_UPDATE_LOADING:
            return {
                ...state,
                loading: action.payload?.loading,
            };
        default:
            return state;
    }
};
