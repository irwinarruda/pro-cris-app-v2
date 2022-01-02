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
                    if (route.name === 'Rotina') {
                        return (
                            <ClipboardIcon
                                marginLeft="2px"
                                size={6}
                                color={color}
                            />
                        );
                    } else {
                        return <StudentsIcon size={6} color={color} />;
                    }
                },
                tabBarStyle: {
                    borderTopWidth: 2,
                    borderTopColor: '#D6CEFE',
                    backgroundColor: '#B0A4ED',
                },
                tabBarContentContainerStyle: {
                    marginBottom: 0,
                    height: 52,
                    paddingBottom: 0,
                },
                tabBarItemStyle: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 15,
                    borderLeftWidth: 1,
                    borderLeftColor: '#D6CEFE',
                    borderRightWidth: 1,
                    borderRightColor: '#D6CEFE',
                },
                tabBarIconStyle: {
                    marginBottom: 0,
                    paddingBottom: 0,
                },
                tabBarLabelStyle: {
                    lineHeight: 12,
                    marginTop: 0,
                    color: '#FDFCFF',
                    textTransform: 'none',
                    fontFamily: 'Quicksand_500Medium',
                },
                tabBarIndicatorStyle: {
                    height: 3,
                    backgroundColor: '#CFC57F',
                },
                tabBarPressColor: 'rgba(255, 255, 255, 0.1)',
            })}
        >
            <Screen name="Rotina" component={Appointments} />
            <Screen name="Alunos" component={Students} />
        </Navigator>
    );
};

export { TabRoute };
