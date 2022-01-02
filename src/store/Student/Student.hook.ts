import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FormValues } from 'app/forms/manageStudent';
import { StudentService } from 'app/services/StudentService';
import { Cost } from 'app/entities/Cost';
import { Student } from 'app/entities/Student';
import { Appointment } from 'app/entities/Appointment';
import { FormValues as AppointmentOptionsFormValues } from 'app/forms/manageAppointment';

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
    manage: ['selectedStudent', 'loading'],
    none: [],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type ListStudentParams = {
    costs?: boolean;
    schedules?: boolean;
    appointments?: boolean;
};

type StudentStoreFunctions = {
    createStudent(student: FormValues): Promise<void>;
    editStudent(student: FormValues): Promise<void>;
    setSelectedStudent(student: Student): void;
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

    const listStudents = React.useCallback(
        async (params?: ListStudentParams): Promise<void> => {
            dispatch(actionStudentUpdateLoading(true));
            const studentService = new StudentService();
            const students = await studentService.listStudents(params);
            if (students) {
                dispatch(actionStudentUpdate(students));
            }
            dispatch(actionStudentUpdateLoading(false));
        },
        [],
    );

    const listStudent = React.useCallback(
        async (studentId?: string): Promise<void> => {
            const studentService = new StudentService();
            if (studentId) {
                const student = await studentService.listStudent(studentId);
                dispatch(actionStudentSelect(student));
            } else {
                dispatch(actionStudentSelect());
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
            dispatch(actionStudentSelect(student));
        },
        [],
    );

    const deleteStudent = React.useCallback(
        async (studentId: string): Promise<void> => {
            const studentService = new StudentService();
            await studentService.deleteStudent(studentId);
            dispatch(actionStudentSelect());
            await listStudents();
        },
        [listStudents],
    );

    const createStudent = React.useCallback(
        async (student: FormValues): Promise<void> => {
            const studentService = new StudentService();
            await studentService.createStudent(student);
            await listStudents();
        },
        [listStudents],
    );

    const editStudent = React.useCallback(
        async (student: FormValues): Promise<void> => {
            const studentService = new StudentService();
            await studentService.updateStudent(student);
            await listStudents();
        },
        [listStudents],
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
            dispatch(actionStudentSelect(student));
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
            dispatch(actionStudentSelect(student));
        },
        [],
    );

    const setSelectedStudent = React.useCallback((student: Student) => {
        dispatch(actionStudentSelect(student));
    }, []);

    const setStudentLoading = React.useCallback((loading: boolean) => {
        dispatch(actionStudentUpdateLoading(loading));
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
        setSelectedStudent,
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
