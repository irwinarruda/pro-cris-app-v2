import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ClipboardIcon } from 'app/components/atoms/ClipboardIcon';
import { StudentsIcon } from 'app/components/atoms/StudentsIcon';

import { Appointments } from 'app/screens/Appointments';
import { Students } from 'app/screens/Students';

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Aulas: undefined;
            Alunos: undefined;
        }
    }
}

type TabRouteProps = {
    children?: React.ReactNode;
};

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TabRoute = ({}: TabRouteProps) => {
    return (
        <Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    if (route.name === 'Aulas') {
                        return <ClipboardIcon size="20px" color={color} />;
                    } else {
                        return <StudentsIcon size="20px" color={color} />;
                    }
                },
                tabBarStyle: {
                    borderTopWidth: 2,
                    borderTopColor: '#D6CEFE',
                    backgroundColor: '#B0A4ED',
                },
                tabBarIconStyle: {
                    width: 16,
                    height: 10,
                },
                tabBarContentContainerStyle: {
                    marginBottom: 0,
                    height: 54,
                    paddingBottom: 2,
                },
                tabBarItemStyle: {
                    paddingTop: 15,
                    borderLeftWidth: 1,
                    borderLeftColor: '#D6CEFE',
                    borderRightWidth: 1,
                    borderRightColor: '#D6CEFE',
                },
                tabBarIndicatorStyle: {
                    height: 3,
                    backgroundColor: '#CFC57F',
                },
                tabBarLabelStyle: {
                    color: '#FDFCFF',
                    textTransform: 'none',
                    fontFamily: 'Quicksand_500Medium',
                },
                tabBarPressColor: 'rgba(255, 255, 255, 0.1)',
            })}
        >
            <Screen name="Aulas" component={Appointments} />
            <Screen name="Alunos" component={Students} />
        </Navigator>
    );
};

export { TabRoute };
