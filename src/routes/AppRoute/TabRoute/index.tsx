import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Appointments } from 'app/screens/Appointments';
import { Students } from 'app/screens/Students';

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Students: undefined;
        }
    }
}

type TabRouteProps = {
    children?: React.ReactNode;
};

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TabRoute = ({}: TabRouteProps) => {
    return (
        <Navigator>
            <Screen name="Appointments" component={Appointments} />
            <Screen name="Students" component={Students} />
        </Navigator>
    );
};

export { TabRoute };
