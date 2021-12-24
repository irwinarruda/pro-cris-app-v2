import React from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import { User } from 'app/entities/User';
import { auth } from 'app/services/firebaseClient';

import { useUserStore } from 'app/hooks/UserStore';
import { Appointments } from 'app/screens/Appointments';

import { AuthRoute } from './AuthRoute';

type RouterProps = {
    children?: React.ReactNode;
};

const Router = ({}: RouterProps) => {
    const [firebaseHasInitiated, setFirebaseHasInitiated] =
        React.useState<boolean>(false);
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
            {!user.id ? <AuthRoute /> : <Appointments />}
        </NavigationContainer>
    ) : (
        <AppLoading />
    );
};
export { Router };
