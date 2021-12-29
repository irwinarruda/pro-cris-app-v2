export type Action<T, P> = {
    readonly type: T;
    readonly payload?: P;
};

export type LoadingStore = {
    loading: boolean;
};

export enum ActionTypes {
    LOADING_UPDATE = 'LOADING_UPDATE',
}

export type ActionLoading = Action<
    ActionTypes.LOADING_UPDATE,
    { loading: boolean }
>;

export type Actions = ActionLoading;
