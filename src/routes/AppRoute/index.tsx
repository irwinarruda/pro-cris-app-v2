import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProCrisHeader } from 'app/components/organisms/ProCrisHeader';

import { ManageStudent } from 'app/screens/ManageStudent';
import { TabRoute } from './TabRoute';

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            TabRoute: undefined;
            ManageStudent: { title: string; type: 'create' | 'edit' | 'view' };
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
            <Screen name="ManageStudent" component={ManageStudent} />
        </Navigator>
    );
};

export { AppRoute };
