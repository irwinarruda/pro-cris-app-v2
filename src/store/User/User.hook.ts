import React from 'react';

import { AuthService } from 'app/services/AuthService';
import { useAppDispatch, useReduxSelector } from 'app/store/Store';

import { UserSlice, setUser } from 'app/store/User/User.slice';
import { User } from 'app/entities/User';

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

const selectors = {
    none: [],
    user: ['user'],
} as const;

type SelectorsKeys = keyof typeof selectors;

type UseStoreFunctions = {
    signIn(credentials: SignInDTO): Promise<void>;
    signUp(credentials: SignUpDTO): Promise<void>;
    signOut(): Promise<void>;
    hydrate(data: { user: User }): void;
};

export const useUserStore = <T extends SelectorsKeys>(
    key = 'none' as T,
): Pick<UserSlice, typeof selectors[T][number]> & UseStoreFunctions => {
    const hooks = useReduxSelector(
        'userReducer',
        genericSelector(selectors[key] as any),
        shallowEqual,
    ) as Pick<UserSlice, typeof selectors[T][number]>;

    const dispatch = useAppDispatch();

    const signIn = React.useCallback(async (credentials: SignInDTO) => {
        const authService = new AuthService();
        const user = await authService.signIn(credentials);
        dispatch(setUser({ user }));
    }, []);

    const signOut = React.useCallback(async () => {
        const authService = new AuthService();
        dispatch(setUser({}));
        await authService.signOut();
    }, []);

    const signUp = React.useCallback(async (credentials: SignUpDTO) => {
        const authService = new AuthService();
        const user = await authService.signUp(credentials);
        dispatch(setUser({ user }));
    }, []);

    const hydrate = React.useCallback(({ user }: { user: User }) => {
        dispatch(setUser({ user }));
    }, []);

    return { ...hooks, signIn, signOut, signUp, hydrate };
};
