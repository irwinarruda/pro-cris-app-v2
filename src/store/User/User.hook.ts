import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { User } from 'app/entities/User';
import { AuthService } from 'app/services/AuthService';

import { ApplicationStores, useReduxSelector } from 'app/store/Store';
import { UserStore } from 'app/store/User/User.types';
import { actionUserReset, actionUserUpdate } from 'app/store/User/User.actions';

import { genericSelector } from 'app/utils/genericSelector';
import { shallowEqual } from 'app/utils/shallowEqual';

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
    let hooks = useReduxSelector(
        'userStore',
        genericSelector(neededStates[key] as any),
        shallowEqual,
    ) as Pick<UserStore, typeof neededStates[T][number]>;

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
