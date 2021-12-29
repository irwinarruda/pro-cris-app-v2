import { Completer } from 'app/utils/Completer';

import { Student } from 'app/entities/Student';

export type Action<T, P> = {
    readonly type: T;
    readonly payload?: P;
};

export type StudentStore = {
    students: Student[];
};

export enum ActionTypes {
    STUDENT_UPDATE_STUDENTS = 'STUDENT_UPDATE_STUDENTS',
    STUDENT_ADD_STUDENTS = 'STUDENT_ADD_STUDENTS',
    STUDENT_DELETE_STUDENTS = 'STUDENT_DELETE_STUDENTS',
}

export type ActionStudentUpdate = Action<
    ActionTypes.STUDENT_UPDATE_STUDENTS,
    { students: Student[] }
>;

export type ActionStudentAdd = Action<
    ActionTypes.STUDENT_ADD_STUDENTS,
    { student: Student }
>;

export type ActionStudentDelete = Action<
    ActionTypes.STUDENT_DELETE_STUDENTS,
    { studentId: string }
>;

export type Actions =
    | ActionStudentUpdate
    | ActionStudentAdd
    | ActionStudentDelete;
