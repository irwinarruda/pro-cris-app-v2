import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FormValues } from 'app/forms/manageStudent';
import { StudentService } from 'app/services/StudentService';
import { Cost } from 'app/entities/Cost';

import { ApplicationStores } from 'app/store/Store';
import { StudentStore } from 'app/store/Student/Student.types';
import {
    actionStudentUpdate,
    actionStudentSelect,
    actionStudentUpdateLoading,
} from 'app/store/Student/Student.actions';

const neededStates = {
    all: ['students', 'loading', 'selectedStudent'],
    list: ['students', 'loading'],
    manage: ['selectedStudent'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type StudentStoreFunctions = {
    createStudent(student: FormValues): Promise<void>;
    editStudent(student: FormValues): Promise<void>;
    listStudents(): Promise<void>;
    listStudent(studentId: string): Promise<void>;
    listStudentCosts(studentId: string): Promise<Cost[]>;
    deleteStudent(studentId: string): Promise<void>;
};

export const useStudentStore = <T extends NeededStatesKeys = 'none'>(
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

    const listStudents = React.useCallback(async () => {
        dispatch(actionStudentUpdateLoading(true));
        const studentService = new StudentService();
        const students = await studentService.listStudents();
        if (students) {
            dispatch(actionStudentUpdate(students));
        }
        dispatch(actionStudentUpdateLoading(false));
    }, []);

    const listStudent = React.useCallback(async (studentId: string) => {
        const studentService = new StudentService();
        const student = await studentService.listStudent(studentId);
        dispatch(actionStudentSelect(student));
    }, []);

    const deleteStudent = React.useCallback(async (studentId: string) => {
        const studentService = new StudentService();
        await studentService.deleteStudent(studentId);
        dispatch(actionStudentSelect());
        listStudents();
    }, []);

    const createStudent = React.useCallback(async (student: FormValues) => {
        const studentService = new StudentService();
        await studentService.createStudent(student);
        listStudents();
    }, []);

    const editStudent = React.useCallback(async (student: FormValues) => {
        const studentService = new StudentService();
        await studentService.updateStudent(student);
        listStudents();
    }, []);

    const listStudentCosts = React.useCallback(
        async (studentId: string): Promise<Cost[]> => {
            const studentService = new StudentService();
            const costs = await studentService.listStudentCosts(studentId);
            return costs;
        },
        [],
    );

    return {
        ...hooks,
        createStudent,
        editStudent,
        listStudents,
        listStudent,
        deleteStudent,
        listStudentCosts,
    };
};
