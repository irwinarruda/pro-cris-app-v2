import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ButtonProps } from 'app/components/atoms/Button';
import { Completer } from 'app/utils/Completer';

export type AlertAsyncResponses = {
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean;
};

export type TextsType = {
    title?: string;
    description?: string;
    confirmButtomProps?: ButtonProps;
    confirmButtomText?: string;
    cancelButtonProps?: ButtonProps;
    cancelButtonText?: string;
};

export type AlertSlice = {
    texts: TextsType;
    isOpen: boolean;
    taskStatus: Completer<AlertAsyncResponses> | null;
};

const INITIAL_STATE: AlertSlice = {
    texts: {
        title: '',
        description: '',
        cancelButtonProps: {},
        cancelButtonText: '',
        confirmButtomProps: {},
        confirmButtomText: '',
    },
    taskStatus: null,
    isOpen: false,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState: INITIAL_STATE,
    reducers: {
        showAlertWithTexts: (
            state,
            action: PayloadAction<{ texts?: TextsType }>,
        ) => {
            const texts = action.payload.texts;
            if (texts) {
                (state.texts as any) = { ...texts };
            }
            state.isOpen = true;
        },
        closeAlert: (state) => {
            state.isOpen = false;
        },
        setTaskStatus: (
            state,
            action: PayloadAction<{
                task?: Completer<AlertAsyncResponses> | null;
                status?: AlertAsyncResponses;
            }>,
        ) => {
            if (state.taskStatus) {
                state.taskStatus.complete(
                    action.payload.status || {
                        isConfirmed: false,
                        isDenied: false,
                        isDismissed: false,
                    },
                );
            }
            state.taskStatus = action.payload.task || null;
        },
    },
});

export const { reducer: alertReducer } = alertSlice;

export const { closeAlert, setTaskStatus, showAlertWithTexts } =
    alertSlice.actions;
