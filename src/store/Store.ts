import { Store } from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { loadingReducer } from './Loading/Loading.reducer';
import { LoadingStore } from './Loading/Loading.types';
import { userReducer } from './User/User.reducer';
import { UserStore } from './User/User.types';
import { alertReducer } from './Alert/Alert.reducer';
import { AlertStore } from './Alert/Alert.types';
import { studentReducer } from './Student/Student.reducer';
import { StudentStore } from './Student/Student.types';

export type ApplicationStores = {
    userStore: UserStore;
    loadingStore: LoadingStore;
    alertStore: AlertStore;
    studentStore: StudentStore;
};

const rootReducer = combineReducers({
    userStore: userReducer,
    loadingStore: loadingReducer,
    alertStore: alertReducer,
    studentStore: studentReducer,
});

const store: Store<ApplicationStores> = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);

export { store };
