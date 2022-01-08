import React from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import { auth } from 'app/services/firebaseClient';

import { useUserStore } from 'app/store/User/User.hook';

import { AuthRoute } from './AuthRoute';
import { AppRoute } from './AppRoute';

type RouterProps = {
    children?: React.ReactNode;
};

const Router = ({}: RouterProps) => {
    const [firebaseHasInitiated, setFirebaseHasInitiated] =
        React.useState<boolean>(true);
    const { user, hydrate } = useUserStore('user');

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setFirebaseHasInitiated(true);
            hydrate({
                user: {
                    id: user?.uid || '',
                    name: user?.displayName || '',
                    email: (user?.email as string) || '',
                    phone: user?.phoneNumber || '',
                    avatar: user?.photoURL || '',
                },
            });
            unsubscribe();
        });
        return unsubscribe;
    }, []);

    return firebaseHasInitiated ? (
        <NavigationContainer>
            {!user.id ? <AuthRoute /> : <AppRoute />}
        </NavigationContainer>
    ) : (
        <AppLoading />
    );
};
export { Router };
