import React from 'react';
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

import { SignIn } from 'app/screens/SignIn';

import { theme } from 'app/styles/theme';

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
            <SignIn />
            <StatusBar style="light" />
        </NativeBaseProvider>
    );
}
