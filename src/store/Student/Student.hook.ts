import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FormValues } from 'app/forms/manageStudent';
import { StudentService } from 'app/services/StudentService';
import { Student } from 'app/entities/Student';

import { ApplicationStores } from 'app/store/Store';
import { StudentStore } from 'app/store/Student/Student.types';
import {
    actionStudentDelete,
    actionStudentAdd,
    actionStudentUpdate,
} from 'app/store/Student/Student.actions';

const neededStates = {
    all: ['students'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type StudentStoreFunctions = {
    createStudent(student: FormValues): Promise<void>;
    editStudent(student: FormValues): Promise<void>;
};

export const useStudentStore = <T extends NeededStatesKeys>(
    key?: T,
): Pick<StudentStore, typeof neededStates[T][number]> &
    StudentStoreFunctions => {
    let hooks = {} as Pick<StudentStore, typeof neededStates[T][number]>;
    hooks = useSelector((state: ApplicationStores) => {
        const obj = {} as any;
        neededStates[key || ('none' as T)].forEach((stateString) => {
            obj[stateString] = state.studentStore[stateString];
        });
        return obj;
    });

    const dispatch = useDispatch();

    const createStudent = React.useCallback(async (student: FormValues) => {
        const studentService = new StudentService();
        await studentService.createStudent(student);
    }, []);

    const editStudent = React.useCallback(async (student: FormValues) => {
        const studentService = new StudentService();
        await studentService.updateStudent(student);
    }, []);

    return { ...hooks, createStudent, editStudent };
};
