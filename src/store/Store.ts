import { Store } from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { loadingReducer } from './Loading/Loading.reducer';
import { LoadingStore } from './Loading/Loading.types';
import { userReducer } from './User/User.reducer';
import { UserStore } from './User/User.types';

export type ApplicationStores = {
    userStore: UserStore;
    loadingStore: LoadingStore;
};

const rootReducer = combineReducers({
    userStore: userReducer,
    loadingStore: loadingReducer,
});

const store: Store<ApplicationStores> = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

export { store };
