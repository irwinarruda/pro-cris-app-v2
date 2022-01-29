import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Student, StudentCover } from 'app/entities/Student';

export type StudentSlice = {
    students: StudentCover[];
    selectedStudent: Student | undefined;
    loading: boolean;
};

const INITIAL_STATE: StudentSlice = {
    students: [],
    selectedStudent: undefined,
    loading: false,
};

const studentSlice = createSlice({
    name: 'student',
    initialState: INITIAL_STATE,
    reducers: {
        setLoading: (state, action: PayloadAction<{ loading?: boolean }>) => {
            state.loading = !!action.payload.loading;
        },
        setSelectedStudent: (
            state,
            action: PayloadAction<{ student?: Student | undefined }>,
        ) => {
            state.selectedStudent = action.payload.student;
        },
        setAllStudents: (
            state,
            action: PayloadAction<{ students: StudentCover[] }>,
        ) => {
            state.students = action.payload.students;
        },
        addStudent: (
            state,
            action: PayloadAction<{ student: StudentCover }>,
        ) => {
            state.students.push(action.payload.student);
        },
        updateOneStudent: (
            state,
            action: PayloadAction<{ student: StudentCover }>,
        ) => {
            let newStudent = [...state.students];
            for (let i in newStudent) {
                if (newStudent[i].id === action.payload?.student.id) {
                    newStudent[i] = { ...action.payload?.student };
                    break;
                }
            }
            state.students = [...newStudent];
        },
    },
});

export const { reducer: studentReducer } = studentSlice;

export const {
    setLoading,
    setAllStudents,
    setSelectedStudent,
    updateOneStudent,
    addStudent,
} = studentSlice.actions;
