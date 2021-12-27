import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from 'app/screens/SignIn';
import { SignUp } from 'app/screens/SignUp';

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            SignIn: undefined;
            SignUp: undefined;
        }
    }
}

type AuthRouteProps = {
    children?: React.ReactNode;
};

const { Navigator, Screen } = createNativeStackNavigator();

const AuthRoute = ({}: AuthRouteProps) => {
    return (
        <Navigator screenOptions={{ header: () => null, animation: 'fade' }}>
            <Screen name="SignIn" component={SignIn} />
            <Screen name="SignUp" component={SignUp} />
        </Navigator>
    );
};

export { AuthRoute };
