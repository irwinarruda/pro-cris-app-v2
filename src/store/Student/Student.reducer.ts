import { Actions, ActionTypes, StudentStore } from './Student.types';

const INITIAL_STATE: StudentStore = {
    students: [],
    selectedStudent: undefined,
    loading: false,
};

export const studentReducer = (state = INITIAL_STATE, action: Actions) => {
    switch (action.type) {
        case ActionTypes.STUDENT_UPDATE_ALL:
            return {
                ...state,
                students: [...(action.payload?.students || [])],
            };
        case ActionTypes.STUDENT_ADD:
            return {
                ...state,
                students: [...state.students, action.payload?.student],
            };
        case ActionTypes.STUDENT_UPDATE_ONE:
            return {
                ...state,
                students: [
                    ...state.students.map((student) => {
                        if (student.id === action.payload?.student.id) {
                            return action.payload?.student;
                        }
                        return student;
                    }),
                ],
            };
        case ActionTypes.STUDENT_DELETE:
            return {
                ...state,
                students: state.students?.map((student) =>
                    student.id === action.payload?.studentId
                        ? { ...student, is_deleted: true }
                        : student,
                ),
            };
        case ActionTypes.STUDENT_LOADING:
            return {
                ...state,
                loading: !!action.payload?.loading,
            };
        case ActionTypes.STUDENT_SELECT:
            return {
                ...state,
                selectedStudent: {
                    ...action.payload?.selectedStudent,
                    appointments: action.payload?.selectedStudent?.appointments
                        ? [...action.payload?.selectedStudent?.appointments]
                        : [],
                    costs: action.payload?.selectedStudent?.costs
                        ? [...action.payload?.selectedStudent?.costs]
                        : [],
                    schedules: action.payload?.selectedStudent?.schedules
                        ? [...action.payload?.selectedStudent?.schedules]
                        : [],
                },
            };
        default:
            return state;
    }
};
