import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProCrisHeader } from 'app/components/organisms/ProCrisHeader';

import { CreateStudent } from 'app/screens/CreateStudent';
import { TabRoute } from './TabRoute';

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            TabRoute: undefined;
            CreateStudent: { title: string };
        }
    }
}

type AppRouteProps = {
    children?: React.ReactNode;
};

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoute = ({}: AppRouteProps) => {
    return (
        <Navigator screenOptions={{ header: ProCrisHeader }}>
            <Screen name="TabRoute" component={TabRoute} />
            <Screen name="CreateStudent" component={CreateStudent} />
        </Navigator>
    );
};

export { AppRoute };
