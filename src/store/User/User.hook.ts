import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { User } from 'app/entities/User';
import { AuthService } from 'app/services/AuthService';

import { ApplicationStores } from 'app/store/Store';
import { UserStore } from 'app/store/User/User.types';
import {
    actionUserLoading,
    actionUserReset,
    actionUserUpdate,
} from 'app/store/User/User.actions';

type SignInDTO = {
    email: string;
    password: string;
};

type SignUpDTO = {
    name: string;
    email: string;
    password: string;
};

const neededStates = {
    none: [],
    user: ['user'],
    loading: ['loading'],
    all: ['user', 'loading'],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type UseStoreFunctions = {
    signIn(credentials: SignInDTO): Promise<void>;
    signUp(credentials: SignUpDTO): Promise<void>;
    signOut(): Promise<void>;
    hydrate(data: { user: User }): void;
};

export const useUserStore = <T extends NeededStatesKeys>(
    key = 'none' as T,
): Pick<UserStore, typeof neededStates[T][number]> & UseStoreFunctions => {
    let hooks = {} as Pick<UserStore, typeof neededStates[T][number]>;
    hooks = useSelector((state: ApplicationStores) => {
        const obj = {} as any;
        neededStates[key as T].forEach((stateString) => {
            obj[stateString] = state.userStore[stateString];
        });
        return obj;
    });

    const dispatch = useDispatch();

    const signIn = React.useCallback(async (credentials: SignInDTO) => {
        const authService = new AuthService();
        const user = await authService.signIn(credentials);
        dispatch(actionUserUpdate(user));
    }, []);

    const signOut = React.useCallback(async () => {
        const authService = new AuthService();
        dispatch(actionUserReset());
        await authService.signOut();
    }, []);

    const signUp = React.useCallback(async (credentials: SignUpDTO) => {
        const authService = new AuthService();
        const user = await authService.signUp(credentials);
        dispatch(actionUserUpdate(user));
    }, []);

    const hydrate = React.useCallback(({ user }: { user: User }) => {
        dispatch(actionUserUpdate(user));
    }, []);

    return { ...hooks, signIn, signOut, signUp, hydrate };
};
