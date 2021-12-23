import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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

const { Navigator, Screen } = createMaterialTopTabNavigator();

const AuthRoute = ({}: AuthRouteProps) => {
    return (
        <Navigator tabBar={() => null}>
            <Screen name="SignIn" component={SignIn} />
            <Screen name="SignUp" component={SignUp} />
        </Navigator>
    );
};

export { AuthRoute };
