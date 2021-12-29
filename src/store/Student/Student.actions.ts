import { Completer } from 'app/utils/Completer';
import {
    ActionTypes,
    ActionStudentAdd,
    ActionStudentDelete,
    ActionStudentUpdate,
} from './Student.types';
import { Student } from 'app/entities/Student';

export const actionStudentAdd = (student: Student): ActionStudentAdd => {
    return {
        type: ActionTypes.STUDENT_ADD_STUDENTS,
        payload: {
            student,
        },
    };
};

export const actionStudentDelete = (studentId: string): ActionStudentDelete => {
    return {
        type: ActionTypes.STUDENT_DELETE_STUDENTS,
        payload: { studentId },
    };
};

export const actionStudentUpdate = (
    students: Student[],
): ActionStudentUpdate => {
    return {
        type: ActionTypes.STUDENT_UPDATE_STUDENTS,
        payload: { students },
    };
};
