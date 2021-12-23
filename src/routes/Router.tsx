import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoute } from './AuthRoute';

type RouterProps = {
    children?: React.ReactNode;
};
const Router = ({}: RouterProps) => {
    return (
        <NavigationContainer>
            <AuthRoute />
        </NavigationContainer>
    );
};
export { Router };
