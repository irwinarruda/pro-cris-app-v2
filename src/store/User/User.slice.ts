import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'app/entities/User';

export type UserSlice = {
    user: User;
};

const INITIAL_STATE: UserSlice = {
    user: {
        name: '',
        avatar: '',
        email: '',
        id: '',
        phone: '',
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action: PayloadAction<{ user?: User }>) => {
            if (action.payload.user) {
                state.user = { ...action.payload.user };
            } else {
                state.user = { ...INITIAL_STATE.user };
            }
        },
    },
});

export const { reducer: userReducer } = userSlice;

export const { setUser } = userSlice.actions;
