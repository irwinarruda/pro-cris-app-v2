import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabRoute } from './TabRoute';

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            TabRoute: undefined;
        }
    }
}

type AppRouteProps = {
    children?: React.ReactNode;
};

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoute = ({}: AppRouteProps) => {
    return (
        <Navigator>
            <Screen name="TabRoute" component={TabRoute} />
        </Navigator>
    );
};

export { AppRoute };
