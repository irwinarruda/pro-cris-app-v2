import React from 'react';
import { Platform } from 'react-native';
import {
    ScrollView,
    IScrollViewProps,
    KeyboardAvoidingView,
} from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type KeyboardAvoidingScrollViewProps = IScrollViewProps;

const KeyboardAvoidingScrollView = ({
    children,
    ...props
}: KeyboardAvoidingScrollViewProps) => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView {...props}>{children}</ScrollView>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};

export type { KeyboardAvoidingScrollViewProps };
export { KeyboardAvoidingScrollView };
