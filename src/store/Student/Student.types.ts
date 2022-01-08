import { Student, StudentCover } from 'app/entities/Student';

export type Action<T, P> = {
    readonly type: T;
    readonly payload?: P;
};

export type StudentStore = {
    students: StudentCover[];
    selectedStudent: Student | undefined;
    loading: boolean;
};

export enum ActionTypes {
    STUDENT_UPDATE_ALL = 'STUDENT_UPDATE_ALL',
    STUDENT_UPDATE_ONE = 'STUDENT_UPDATE_ONE',
    STUDENT_ADD = 'STUDENT_ADD',
    STUDENT_DELETE = 'STUDENT_DELETE',
    STUDENT_LOADING = 'STUDENT_LOADING',
    STUDENT_SELECT = 'STUDENT_SELECT',
}

export type ActionStudentUpdate = Action<
    ActionTypes.STUDENT_UPDATE_ALL,
    { students: StudentCover[] }
>;

export type ActionStudentAdd = Action<
    ActionTypes.STUDENT_ADD,
    { student: Student }
>;

export type ActionStudentUpdateOne = Action<
    ActionTypes.STUDENT_UPDATE_ONE,
    { student: Student }
>;

export type ActionStudentDelete = Action<
    ActionTypes.STUDENT_DELETE,
    { studentId: string }
>;

export type ActionStudentUpdateLoading = Action<
    ActionTypes.STUDENT_LOADING,
    { loading: boolean }
>;

export type ActionStudentSelect = Action<
    ActionTypes.STUDENT_SELECT,
    { selectedStudent: Student | undefined }
>;

export type Actions =
    | ActionStudentUpdate
    | ActionStudentAdd
    | ActionStudentDelete
    | ActionStudentUpdateLoading
    | ActionStudentSelect
    | ActionStudentUpdateOne;
