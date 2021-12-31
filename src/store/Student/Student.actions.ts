import {
    ActionTypes,
    ActionStudentAdd,
    ActionStudentDelete,
    ActionStudentUpdate,
    ActionStudentUpdateLoading,
    ActionStudentSelect,
} from './Student.types';
import { Student, StudentCover } from 'app/entities/Student';

export const actionStudentAdd = (student: Student): ActionStudentAdd => {
    return {
        type: ActionTypes.STUDENT_ADD,
        payload: {
            student,
        },
    };
};

export const actionStudentDelete = (studentId: string): ActionStudentDelete => {
    return {
        type: ActionTypes.STUDENT_DELETE,
        payload: { studentId },
    };
};

export const actionStudentUpdate = (
    students: StudentCover[],
): ActionStudentUpdate => {
    return {
        type: ActionTypes.STUDENT_UPDATE_ALL,
        payload: { students },
    };
};

export const actionStudentUpdateLoading = (
    loading: boolean,
): ActionStudentUpdateLoading => {
    return {
        type: ActionTypes.STUDENT_LOADING,
        payload: { loading },
    };
};

export const actionStudentSelect = (
    selectedStudent?: Student,
): ActionStudentSelect => {
    return {
        type: ActionTypes.STUDENT_SELECT,
        payload: { selectedStudent },
    };
};
