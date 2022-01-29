import React from 'react';

import {
    updateOneStudent,
    addStudent,
    setSelectedStudent,
    setAllStudents,
    setLoading,
    StudentSlice,
} from 'app/store/Student/Student.slice';
import { useAppDispatch, useReduxSelector } from 'app/store/Store';

import { FormValues } from 'app/forms/manageStudent';
import { StudentService } from 'app/services/StudentService';
import { Cost } from 'app/entities/Cost';
import { Student } from 'app/entities/Student';
import { FormValues as AppointmentOptionsFormValues } from 'app/forms/manageAppointment';

import { genericSelector } from 'app/utils/genericSelector';
import { shallowEqual } from 'app/utils/shallowEqual';

const selectors = {
    all: ['students', 'loading', 'selectedStudent'],
    list: ['students', 'loading'],
    manage: ['selectedStudent', 'loading'],
    none: [],
} as const;

type SelectorsKeys = keyof typeof selectors;

type ListStudentParams = {
    costs?: boolean;
    schedules?: boolean;
    appointments?: boolean;
};

type StudentSliceFunctions = {
    createStudent(student: FormValues): Promise<void>;
    editStudent(student: FormValues): Promise<void>;
    listStudents(params?: ListStudentParams): Promise<void>;
    listStudent(studentId?: string): Promise<void>;
    listStudentWithAppointments(studentId: string): Promise<void>;
    listStudentCosts(studentId: string): Promise<Cost[]>;
    deleteStudent(studentId: string): Promise<void>;
    setStudentLoading(loading: boolean): void;
    updateSelectedUserAppointmentOptions(
        selectedStudent: Student,
        appointment: AppointmentOptionsFormValues,
    ): void;
    updateAllSelectedUserAppointmentOptions(
        selectedStudent: Student,
        appointments: AppointmentOptionsFormValues[],
    ): void;
};

export const useStudentStore = <T extends SelectorsKeys = 'none'>(
    key = 'none' as T,
): Pick<StudentSlice, typeof selectors[T][number]> & StudentSliceFunctions => {
    const hooks = useReduxSelector(
        'studentReducer',
        genericSelector(selectors[key] as any),
        shallowEqual,
    ) as Pick<StudentSlice, typeof selectors[T][number]>;

    const dispatch = useAppDispatch();

    const listStudents = React.useCallback(
        async (params?: ListStudentParams): Promise<void> => {
            dispatch(setLoading({ loading: true }));
            const studentService = new StudentService();
            const students = await studentService.listStudents(params);
            if (students) {
                dispatch(setAllStudents({ students }));
            }
            dispatch(setLoading({ loading: false }));
        },
        [],
    );

    const listStudent = React.useCallback(
        async (studentId?: string): Promise<void> => {
            if (studentId) {
                const studentService = new StudentService();
                const student = await studentService.listStudent(studentId);
                dispatch(setSelectedStudent({ student }));
            } else {
                dispatch(setSelectedStudent({}));
            }
        },
        [],
    );

    const listStudentWithAppointments = React.useCallback(
        async (studentId: string): Promise<void> => {
            const studentService = new StudentService();
            const student = await studentService.listStudent(studentId, {
                appointments: true,
                costs: false,
                schedules: false,
            });
            dispatch(setSelectedStudent({ student }));
        },
        [],
    );

    const deleteStudent = React.useCallback(
        async (studentId: string): Promise<void> => {
            const studentService = new StudentService();
            await studentService.deleteStudent(studentId);
            dispatch(setSelectedStudent({}));
            await listStudents();
        },
        [listStudents],
    );

    const createStudent = React.useCallback(
        async (student: FormValues): Promise<void> => {
            const studentService = new StudentService();
            const studentResponse = await studentService.createStudent(student);
            dispatch(addStudent({ student: studentResponse }));
        },
        [],
    );

    const editStudent = React.useCallback(
        async (student: FormValues): Promise<void> => {
            const studentService = new StudentService();
            const studentResponse = await studentService.updateStudent(student);
            dispatch(updateOneStudent({ student: studentResponse }));
        },
        [],
    );

    const updateSelectedUserAppointmentOptions = React.useCallback(
        (
            selectedStudent: Student,
            appointment: AppointmentOptionsFormValues,
        ): void => {
            const student = {
                ...selectedStudent,
                appointments: selectedStudent.appointments.map((app) => {
                    if (app.id === appointment.id) {
                        return { ...app, ...appointment };
                    } else {
                        return app;
                    }
                }),
            };
            dispatch(setSelectedStudent({ student }));
        },
        [],
    );

    const updateAllSelectedUserAppointmentOptions = React.useCallback(
        (
            selectedStudent: Student,
            appointments: AppointmentOptionsFormValues[],
        ): void => {
            let newAppointments = [
                ...appointments,
            ] as AppointmentOptionsFormValues[];
            let newFilteredAppointments = selectedStudent.appointments.map(
                (app) => {
                    let hasFiltered = undefined as
                        | AppointmentOptionsFormValues
                        | undefined;
                    newAppointments = newAppointments.filter((newApp) => {
                        if (newApp.id === app.id) {
                            hasFiltered = { ...newApp };
                        }
                        return newApp.id !== app.id;
                    });
                    if (hasFiltered) {
                        return { ...app, ...hasFiltered };
                    } else {
                        return app;
                    }
                },
            );
            const student = {
                ...selectedStudent,
                appointments: newFilteredAppointments,
            };
            dispatch(setSelectedStudent({ student }));
        },
        [],
    );

    const setStudentLoading = React.useCallback((loading: boolean) => {
        dispatch(setLoading({ loading: loading }));
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
        setStudentLoading,
        createStudent,
        editStudent,
        listStudents,
        listStudent,
        deleteStudent,
        listStudentCosts,
        listStudentWithAppointments,
        updateSelectedUserAppointmentOptions,
        updateAllSelectedUserAppointmentOptions,
    };
};
