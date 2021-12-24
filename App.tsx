import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import {
    useFonts,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { Yellowtail_400Regular } from '@expo-google-fonts/yellowtail';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import { Router } from 'app/routes/Router';

import { theme } from 'app/styles/theme';

import { store } from 'app/store/Store';

import 'app/services/firebaseClient';

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

export default function App() {
    let [fontsLoaded] = useFonts({
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
        Yellowtail_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NativeBaseProvider theme={theme}>
            <Provider store={store}>
                <Router />
            </Provider>
            <StatusBar style="light" />
        </NativeBaseProvider>
    );
}
