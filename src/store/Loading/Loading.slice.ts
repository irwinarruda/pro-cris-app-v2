import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoadingSlice = {
    loading: boolean;
};

const INITIAL_STATE: LoadingSlice = {
    loading: false,
};
const loadingSlice = createSlice({
    name: 'loading',
    initialState: INITIAL_STATE,
    reducers: {
        setLoading: (state, action: PayloadAction<{ loading?: boolean }>) => {
            state.loading = !!action.payload.loading;
        },
    },
});

export const { reducer: loadingReducer } = loadingSlice;

export const { setLoading } = loadingSlice.actions;
