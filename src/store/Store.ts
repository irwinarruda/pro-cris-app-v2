import { Store } from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { userReducer } from './User/User.reducer';
import { UserStore } from './User/User.types';

export type ApplicationStores = {
    userStore: UserStore;
};

const rootReducer = combineReducers({
    userStore: userReducer,
});

const store: Store<ApplicationStores> = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

export { store };
