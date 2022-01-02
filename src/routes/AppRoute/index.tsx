import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StudentCover } from 'app/entities/Student';
import { Appointment } from 'app/entities/Appointment';

import { ProCrisHeader } from 'app/components/organisms/ProCrisHeader';

import { ManageStudent } from 'app/screens/ManageStudent';
import { ManageAppointment } from 'app/screens/ManageAppointment';

import { TabRoute } from './TabRoute';

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            TabRoute: undefined;
            ManageStudent: { title: string; type: 'create' | 'edit' | 'view' };
            ManageAppointment: {
                title: string;
                persistModal?: boolean;
                appointment?: Omit<Appointment, 'date'> & {
                    student: StudentCover;
                    date: string;
                };
            };
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
            <Screen name="ManageAppointment" component={ManageAppointment} />
        </Navigator>
    );
};

export { AppRoute };
