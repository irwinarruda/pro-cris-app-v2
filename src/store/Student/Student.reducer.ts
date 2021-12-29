import { Actions, ActionTypes, StudentStore } from './Student.types';

const INITIAL_STATE: StudentStore = {
    students: [],
};

export const studentReducer = (state = INITIAL_STATE, action: Actions) => {
    switch (action.type) {
        case ActionTypes.STUDENT_UPDATE_STUDENTS:
            return { ...state, students: action.payload?.students };
        case ActionTypes.STUDENT_ADD_STUDENTS:
            return {
                ...state,
                students: [...state.students, action.payload?.student],
            };
        case ActionTypes.STUDENT_DELETE_STUDENTS:
            return {
                ...state,
                students: state.students.filter(
                    (student) => student.id !== action.payload?.studentId,
                ),
            };
        default:
            return state;
    }
};
