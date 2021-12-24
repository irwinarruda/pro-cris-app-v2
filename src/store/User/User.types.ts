import { User } from 'app/entities/User';

export type Action<T, P> = {
    readonly type: T;
    readonly payload?: P;
};

export type UserStore = {
    user: User;
    loading: boolean;
};

enum ActionTypes {
    USER_UPDATE = 'USER_UPDATE',
    USER_LOADING = 'USER_LOADING',
    USER_RESET = 'USER_RESET',
}

export type ActionUserLoading = Action<
    ActionTypes.USER_LOADING,
    { loading: boolean }
>;
export type ActionUserUpdate = Action<ActionTypes.USER_UPDATE, { user: User }>;
export type ActionUserReset = Action<ActionTypes.USER_RESET, void>;

export type Actions = ActionUserLoading | ActionUserUpdate | ActionUserReset;

export { ActionTypes };
