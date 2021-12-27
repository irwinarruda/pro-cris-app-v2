import React from 'react';
import { Platform } from 'react-native';
import {
    ScrollView,
    IScrollViewProps,
    KeyboardAvoidingView,
} from 'native-base';

type KeyboardAvoidingScrollViewProps = IScrollViewProps;

const KeyboardAvoidingScrollView = ({
    children,
    ...props
}: KeyboardAvoidingScrollViewProps) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView {...props}>{children}</ScrollView>
        </KeyboardAvoidingView>
    );
};

export type { KeyboardAvoidingScrollViewProps };
export { KeyboardAvoidingScrollView };
